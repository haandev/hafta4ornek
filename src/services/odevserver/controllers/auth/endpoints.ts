import service from "../../instance"
import { LoginRequest, User, RegisterRequest } from "./types"

export const login = (payload: LoginRequest) =>
  service.post<User>("auth/login", payload).then((response) => {
    service.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`
    return response
  })

export const register = async (payload: RegisterRequest) =>
  service.post<User>("auth/register", payload).then((response) => {
    service.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`
    return response
  })
