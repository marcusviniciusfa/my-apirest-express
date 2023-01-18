export interface IAuth {
  getToken(payload: string, options?: object): string
  decodeToken(token: string, options?: object): string | { [key: string]: any }
}
