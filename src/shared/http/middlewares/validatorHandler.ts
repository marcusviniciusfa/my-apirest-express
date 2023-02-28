import { BadRequestError } from '@/shared/errors/BadRequestError'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export async function validatorHandler(req: Request, _res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const [error] = errors.array({ onlyFirstError: true })
    throw new BadRequestError(error.msg)
  }
  next()
}
