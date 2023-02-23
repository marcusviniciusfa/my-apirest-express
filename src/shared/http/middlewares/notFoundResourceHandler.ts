import { NotFoundError } from '@/shared/errors/NotFoundError'
import { NextFunction, Request, Response } from 'express'

export async function notFoundResourceHandler(req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError(`requested path ${req.originalUrl} not found`))
}
