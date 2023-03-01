import { AppError, ErrorMessageInterpolation } from './AppError'

export class BadRequestError extends AppError {
  constructor(message: string, interpolation: ErrorMessageInterpolation = {}) {
    super(message)
    this.statusCode = 400
    this.emoji = '❌'
    this.interpolation = interpolation
  }
}
