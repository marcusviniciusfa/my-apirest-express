import jwt from 'jsonwebtoken'
import { IAuth } from './IAuth'

export class JwtAuth implements IAuth {
  private key: string
  private expiresIn: string

  constructor() {
    this.key = process.env.AUTH_KEY
    this.expiresIn = process.env.AUTH_EXPIRES_IN
  }

  getToken(payload: object, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.key, { expiresIn: this.expiresIn, ...options })
  }

  decodeToken(token: string, options?: jwt.DecodeOptions): string | jwt.JwtPayload | null {
    return jwt.decode(token, options)
  }
}

const jwtAuth = new JwtAuth()
export { jwtAuth }
