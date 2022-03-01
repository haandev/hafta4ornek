import service from "../../instance"
import { Status, CreateStatusRequest, FilterStatusParams } from "./types"

export const create = (payload: CreateStatusRequest) =>
  service.post<Status>("status", payload)

export const update = (id: number, payload: CreateStatusRequest) =>
  service.put<Status>(`status/${id}`, payload)

export const destroy = (id: number) => service.delete(`status/${id}`)

export const getById = (id: number) => service.get<Status>(`status/${id}`)

export const list = (params: FilterStatusParams) =>
  service.get<Status[]>(`status`, { params })
