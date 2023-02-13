import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthPayload, IAuth } from './IAuth'

export class JwtAuth implements IAuth {
  private readonly accessTokenSecret: string
  private readonly accessTokenDuration: string
  private readonly accessTokenAudience: string
  private readonly refreshTokenIssuer: string
  private readonly refreshTokenSecret: string
  private readonly refreshTokenDuration: string
  private readonly refreshTokenAudience: string
  private readonly accessTokenIssuer: string

  constructor() {
    // Access token
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    this.accessTokenDuration = `${process.env.ACCESS_TOKEN_DURATION_IN_MINUTES}m`
    this.accessTokenAudience = process.env.ACCESS_TOKEN_AUDIENCE
    this.accessTokenIssuer = process.env.ACCESS_TOKEN_ISSUER

    //Refresh token
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    this.refreshTokenDuration = `${process.env.REFRESH_TOKEN_DURATION_IN_MINUTES}m`
    this.refreshTokenAudience = process.env.REFRESH_TOKEN_AUDIENCE
    this.refreshTokenIssuer = process.env.REFRESH_TOKEN_ISSUER
  }

  createAccessToken(payload: object = {}, options: jwt.SignOptions = {}): string {
    const token = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenDuration,
      audience: this.accessTokenAudience,
      issuer: this.accessTokenIssuer,
      ...options,
    })

    return token
  }

  createRefreshToken(payload: object = {}, options: jwt.SignOptions = {}): string {
    const token = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenDuration,
      audience: this.refreshTokenAudience,
      issuer: this.refreshTokenIssuer,
      ...options,
    })

    return token
  }

  tokenValidator(token: string, key: string, options: jwt.VerifyOptions = {}): AuthPayload {
    const { sub: subject } = jwt.verify(token, key, options) as JwtPayload
    return { subject }
  }
}

const jwtAuth = new JwtAuth()
export { jwtAuth }
