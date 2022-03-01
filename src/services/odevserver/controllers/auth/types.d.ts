export type LoginRequest = {
  username: string
  password: string
}
export type User = {
  id: number
  username: string
  token: string
}

export type RegisterRequest = {
  username: string
  password: string
  passwordConfirm: string
}
