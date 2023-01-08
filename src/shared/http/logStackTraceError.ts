import { NextFunction, Request, Response } from 'express'

export function logStackTraceError(error: Error, _req: Request, _res: Response, next: NextFunction) {
  console.error(error.stack)
  next(error)
}
