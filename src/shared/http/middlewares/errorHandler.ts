import { translator } from '@/shared/container'
import { AppError } from '@/shared/errors/AppError'
import { InternalServerError } from '@/shared/errors/InternalServerError'
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function errorHandler(error: AppError, _req: Request, res: Response, _next: NextFunction) {
  if (!error.statusCode) {
    error = new InternalServerError('internal-server-error')
  }
  const message = translator.translate(error.message, error.interpolation)
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    error: message.concat(` ${error.emoji}`),
  })
}
