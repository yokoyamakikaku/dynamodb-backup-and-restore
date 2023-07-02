"use client"

import { FC } from "react"
import { DeleteTodoInput, DeleteTodoMutation, ListTodosQuery, ListTodosQueryVariables, Todo } from "@/API"
import { useMutation, useQuery } from "@tanstack/react-query"
import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api"

import * as queries from '@/graphql/queries'
import * as mutations from '@/graphql/mutations'

import { Flex, Text, View, Button, Table, TableHead, TableBody, TableRow, TableCell, Alert, useTheme } from "@aws-amplify/ui-react"

const ListTodos: FC = () => {
  const theme = useTheme()

  const query = useQuery({
    queryKey: ['todos'],
    async queryFn () {
      const result = (await API.graphql(
        graphqlOperation(
          queries.listTodos, {

          } as ListTodosQueryVariables
        )
      )) as GraphQLResult<ListTodosQuery>
      if (result.errors) throw result.errors
      return result.data?.listTodos?.items as Todo[]
    }
  })

  const mutation = useMutation({
    async mutationFn (input: DeleteTodoInput) {
      const result = (await API.graphql(
        graphqlOperation(
          mutations.deleteTodo, {
            input
          } as ListTodosQueryVariables
        )
      )) as GraphQLResult<DeleteTodoMutation>
      if (result.errors) throw result.errors
      return result.data?.deleteTodo as Todo
    },
    onSuccess () {
      query.refetch()
    }
  })

  return (
    <View>
      <View marginBlockEnd={theme.tokens.space.medium}>
        <Button>再読み込み</Button>
      </View>
      {query.isLoading && <Alert>読み込み中</Alert>}
      {query.isError && <Alert variation="error">エラー</Alert>}
      {query.isSuccess && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Descripotion</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query.data.length < 1 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Text>データがありません</Text>
                </TableCell>
              </TableRow>
            ) : (
              query.data.map(todo => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.name}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell>
                    <Button onClick={() => mutation.mutate({ id: todo.id })}>削除する</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </View>
  )
}

export default ListTodos
