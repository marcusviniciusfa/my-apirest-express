export interface AuthPayload {
  subject: string
}

export interface IAuth {
  getToken(payload: object, options?: object): string
  decodeToken(token: string, options?: object): AuthPayload | null
}
