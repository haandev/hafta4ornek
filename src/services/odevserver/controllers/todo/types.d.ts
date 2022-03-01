export type Todo = {
  id: number
  categoryId: number
  statusId: number
  title: string
  updatedAt: string
  createdAt: string
}

export type CreateTodoRequest = Pick<Todo, "title",  "categoryId",  "statusId">
export type FilterTodoParams = Omit<Todo, "createdAt", "updatedAt">
