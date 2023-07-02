"use client"

import { FC } from "react"

import { CreateTodoInput, CreateTodoMutation, CreateTodoMutationVariables, Todo } from "@/API"
import { useMutation } from "@tanstack/react-query"
import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api"

import * as mutations from '@/graphql/mutations'
import { useForm } from "react-hook-form"
import { Alert, Button, TextAreaField, TextField, Flex } from "@aws-amplify/ui-react"

const CreateTodo: FC = () => {
  const { register, handleSubmit, reset } = useForm<CreateTodoInput>({
    defaultValues: {

    }
  })

  const mutation = useMutation({
    async mutationFn (input: CreateTodoInput) {
      const result = (await API.graphql(
        graphqlOperation(
          mutations.createTodo, {
            input
          } as CreateTodoMutationVariables
        )
      )) as GraphQLResult<CreateTodoMutation>
      if (result.errors) throw result.errors
      return result.data?.createTodo as Todo
    },
    onSuccess() {
      setTimeout(reset, 1000)
    }
  })

  return (
    <form onSubmit={handleSubmit(values => mutation.mutate(values))}>
      <Flex direction="column">
        <TextField label="Name" {...register("name")} />
        <TextAreaField label="Description" {...register("name")} />
        {mutation.isError && <Alert variation="error">エラー</Alert>}
        {mutation.isLoading && <Alert>作成中</Alert>}
        <Button variation="primary" type="submit">作成する</Button>
        {mutation.isSuccess && <Alert variation="success">作成しました</Alert>}
      </Flex>
    </form>
  )
}

export default CreateTodo
