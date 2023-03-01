import i18next from 'i18next'
import { ErrorMessageInterpolation } from '../errors/AppError'
import { ITranslator } from './ITranslator'

export class Translator implements ITranslator {
  translate(key: string, interpolation: ErrorMessageInterpolation): string {
    return i18next.t(key, interpolation)
  }
}
