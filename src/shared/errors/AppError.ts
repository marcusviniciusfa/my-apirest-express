export class AppError extends Error {
  statusCode: number
  emoji: string
  interpolation: ErrorMessageInterpolation
}

export interface ErrorMessageInterpolation {
  [key: string]: string
}
