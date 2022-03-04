import service from "../../instance"
import { Todo, CreateTodoRequest, FilterTodoParams } from "./types"

export const create = (payload: CreateTodoRequest) =>
  service.post<Todo>("todo", payload)

export const update = (id: number, payload: CreateTodoRequest) =>
  service.put<Todo>(`todo/${id}`, payload)

export const destroy = (id: number) => service.delete(`todo/${id}`)

export const getById = (id: number) => service.get<Todo>(`todo/${id}`)

export const list = (params: FilterTodoParams) =>
  service.get<Todo[]>(`todo`, { params })
