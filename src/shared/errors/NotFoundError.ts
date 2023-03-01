import { AppError, ErrorMessageInterpolation } from './AppError'

export class NotFoundError extends AppError {
  constructor(message: string, interpolation: ErrorMessageInterpolation = {}) {
    super(message)
    this.statusCode = 404
    this.emoji = '🔎'
    this.interpolation = interpolation
  }
}
