import service from "../../instance"
import { Todo, CreateTodoRequest, FilterTodoParams } from "./types"

export const create = (payload: CreateTodoRequest) =>
  service.post<Todo>("status", payload)

export const update = (id: number, payload: CreateTodoRequest) =>
  service.put<Todo>(`status/${id}`, payload)

export const destroy = (id: number) => service.delete(`status/${id}`)

export const getById = (id: number) => service.get<Todo>(`status/${id}`)

export const list = (params: FilterTodoParams) =>
  service.get<Todo[]>(`status`, { params })
