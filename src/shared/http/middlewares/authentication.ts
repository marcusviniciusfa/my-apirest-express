import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { NextFunction, Request, Response } from 'express'

export async function authentication(req: Request, _res: Response, next: NextFunction) {
  if (req.url.includes('/login')) {
    return next()
  }
  const { authorization } = req.headers
  if (!authorization) {
    throw new Unauthorized('failed to verify access token 🔒')
  }
  const token = authorization.replace('Bearer', '').trim()
  const decodeToken = jwtAuth.decodeToken(token)
  if (!decodeToken) {
    throw new Unauthorized('unauthenticated user 🔒')
  }
  req.user = { id: decodeToken.subject }
  next()
}
