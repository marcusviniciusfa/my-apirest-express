export interface AuthPayload {
  subject: string
}

export interface IAuth {
  getAccessToken(payload: object, options?: object): string
  getRefreshToken(payload: object, options?: object): string
  decodeToken(token: string, options?: object): AuthPayload | null
}
