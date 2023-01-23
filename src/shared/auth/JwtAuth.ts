import jwt from 'jsonwebtoken'
import { AuthPayload, IAuth } from './IAuth'

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

  decodeToken(token: string, options?: jwt.DecodeOptions): AuthPayload | null {
    const { sub: subject } = jwt.decode(token, options)
    return { subject } as AuthPayload
  }
}

const jwtAuth = new JwtAuth()
export { jwtAuth }
