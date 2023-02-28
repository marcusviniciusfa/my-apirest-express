import { NextFunction, Request, Response } from 'express'
import i18n from 'i18next'

export async function detectLanguageHandler(req: Request, _res: Response, next: NextFunction) {
  const clientLanguage = req.headers['accept-language']
  i18n.changeLanguage(clientLanguage)
  next()
}
