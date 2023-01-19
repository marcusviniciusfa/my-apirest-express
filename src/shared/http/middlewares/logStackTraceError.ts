import { NextFunction, Request, Response } from 'express'

export async function logStackTraceError(error: Error, _req: Request, _res: Response, next: NextFunction) {
  console.error(error.stack)
  next(error)
}
