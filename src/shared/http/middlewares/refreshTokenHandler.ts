import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { IExtendedResponse } from '@/shared/interfaces/IExtendedResponse'
import { NextFunction, Request } from 'express'
import { createHmac } from 'node:crypto'

export async function refreshTokenHandler(req: Request, res: IExtendedResponse, next: NextFunction) {
  const { 'refresh-token': refreshToken } = req.cookies
  if (!refreshToken) {
    throw new Unauthorized('refresh token is not present')
  }
  try {
    jwtAuth.tokenValidator(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
      audience: process.env.REFRESH_TOKEN_AUDIENCE,
      issuer: process.env.REFRESH_TOKEN_ISSUER,
    })
    const refreshTokenHash = createHmac('sha512', process.env.REFRESH_TOKEN_SECRET).update(refreshToken).digest('hex')
    res.locals = { refreshTokenHash }
  } catch (error) {
    next(new Unauthorized('unauthenticated user'))
  }
  next()
}
