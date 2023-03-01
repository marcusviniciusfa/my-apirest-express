import { AppError, ErrorMessageInterpolation } from './AppError'

export class InternalServerError extends AppError {
  constructor(message: string, interpolation: ErrorMessageInterpolation = {}) {
    super(message)
    this.statusCode = 500
    this.emoji = '💥'
    this.interpolation = interpolation
  }
}
