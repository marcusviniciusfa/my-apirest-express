export class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    Object.assign(this, { message, statusCode })
  }
}
