import { NextFunction, Request, Response } from 'express'
import i18next from 'i18next'

export async function detectLanguageHandler(req: Request, _res: Response, next: NextFunction) {
  const clientLanguage = req.headers['accept-language'] || 'en'
  await i18next.changeLanguage(clientLanguage)
  next()
}
