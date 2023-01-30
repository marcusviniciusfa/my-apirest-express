export interface CreateRefreshTokenDTO {
  token: string
  valid?: boolean
  expires: Date
  userId: string
}
