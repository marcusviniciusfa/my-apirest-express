import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { NextFunction, Request, Response } from 'express'

export async function authenticationHandler(req: Request, res: Response, next: NextFunction) {
  const allowedRoutesByDefault = ['/docs', '/login', '/files']
  const allowedRoutesPattern = new RegExp(allowedRoutesByDefault.join('|'), 'g')
  if (!allowedRoutesPattern.test(req.path)) {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Unauthorized('access token is not present')
    }
    const [, token] = authorization.split(' ')
    try {
      const decodedToken = jwtAuth.tokenValidator(token, process.env.ACCESS_TOKEN_SECRET, {
        audience: process.env.ACCESS_TOKEN_AUDIENCE,
        issuer: process.env.ACCESS_TOKEN_ISSUER,
      })
      res.locals = { user: { id: decodedToken.subject } }
    } catch (error) {
      next(new Unauthorized('unauthenticated user'))
    }
  }
  next()
}
