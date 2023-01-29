import { NotFoundError } from '@/shared/errors/NotFoundError'
import { NextFunction, Request, Response } from 'express'

export async function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError(`requested path ${req.originalUrl} not found`))
}
