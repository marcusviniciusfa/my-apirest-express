export interface AuthPayload {
  subject: string
}

export interface IAuth {
  createAccessToken(payload: object, options: object): string
  createRefreshToken(payload: object, options: object): string
  tokenValidator(token: string, key: string, options: object): AuthPayload | null
}
