import { NotFoundError } from '@/shared/errors/NotFoundError'
import { NextFunction, Request, Response } from 'express'

export async function notFoundResourceHandler(req: Request, _res: Response, next: NextFunction) {
  console.log(req.originalUrl)
  next(new NotFoundError('requested-path-not-found', { path: req.originalUrl }))
}
