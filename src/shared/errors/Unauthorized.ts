import { AppError, ErrorMessageInterpolation } from './AppError'

export class Unauthorized extends AppError {
  constructor(message: string, interpolation: ErrorMessageInterpolation = {}) {
    super(message)
    this.statusCode = 401
    this.emoji = '🔒'
    this.interpolation = interpolation
  }
}
