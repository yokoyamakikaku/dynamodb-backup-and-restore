import PageContainer from "@/components/PageContainer";

import CreateTodo from "./CreateTodo";
import ListTodos from "./ListTodos";

export default function Home() {
  return (
    <PageContainer>
      <CreateTodo />
      <ListTodos />
    </PageContainer>
  )
}
