export interface IAuth {
  getToken(payload: object, options?: object): string
  decodeToken(token: string, options?: object): string | { [key: string]: any }
}
