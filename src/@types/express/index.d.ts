/**
 * arquivo de definição de tipagens
 * "namespaces" são módulos internos
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}
