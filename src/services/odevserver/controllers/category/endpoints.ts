import service from "../../instance"
import { Category, CreateCategoryRequest, FilterCategoryParams } from "./types"

export const create = (payload: CreateCategoryRequest) =>
  service.post<Category>("category", payload)

export const update = (id: number, payload: CreateCategoryRequest) =>
  service.put<Category>(`category/${id}`, payload)

export const destroy = (id: number) => service.delete(`category/${id}`)

export const getById = (id: number) =>
  service.get<CreateCategoryRequest>(`category/${id}`)

export const list = (params: FilterCategoryParams) =>
  service.get<Category[]>(`category`, { params })
