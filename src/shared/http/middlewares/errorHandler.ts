import { IAppError } from '@/shared/errors/IAppError'
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function errorHandler(error: IAppError, _req: Request, res: Response, _next: NextFunction) {
  error.statusCode = error.statusCode || 500
  res.status(error.statusCode).json({
    status: 'error',
    message: error.message,
  })
}
