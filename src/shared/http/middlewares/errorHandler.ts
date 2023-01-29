import { IAppError } from '@/shared/errors/IAppError'
import { InternalServerError } from '@/shared/errors/InternalServerError'
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function errorHandler(error: IAppError, _req: Request, res: Response, _next: NextFunction) {
  if (!error.statusCode) {
    error = new InternalServerError(error.message)
  }
  res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
  })
}
