import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { NextFunction, Request, Response } from 'express'

export async function authentication(req: Request, _res: Response, next: NextFunction) {
  const allowedRoutesByDefault = ['/docs', '/login', '/files']
  const allowedRoutesPattern = new RegExp(allowedRoutesByDefault.join('|'), 'g')
  if (!allowedRoutesPattern.test(req.path)) {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Unauthorized('failed to verify access token')
    }
    const token = authorization.replace('Bearer', '').trim()
    const decodeToken = jwtAuth.decodeToken(token)
    if (!decodeToken) {
      throw new Unauthorized('unauthenticated user')
    }
    req.user = { id: decodeToken.subject }
  }
  next()
}
