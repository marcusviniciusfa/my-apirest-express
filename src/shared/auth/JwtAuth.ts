import jwt from 'jsonwebtoken'
import { AuthPayload, IAuth } from './IAuth'

export class JwtAuth implements IAuth {
  private accessTokenKey: string
  private accessTokenExpiresIn: string
  private refreshTokenKey: string
  private refreshTokenExpiresIn: string

  constructor() {
    this.accessTokenKey = process.env.ACCESS_KEY
    this.accessTokenExpiresIn = process.env.ACCESS_EXPIRES_IN
  }

  getAccessToken(payload: object, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.accessTokenKey, { expiresIn: this.accessTokenExpiresIn, ...options })
  }

  getRefreshToken(payload: object, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.refreshTokenKey, { expiresIn: this.refreshTokenExpiresIn, ...options })
  }

  decodeToken(token: string, options?: jwt.DecodeOptions): AuthPayload | null {
    const { sub: subject } = jwt.decode(token, options)
    return { subject } as AuthPayload
  }
}

const jwtAuth = new JwtAuth()
export { jwtAuth }
