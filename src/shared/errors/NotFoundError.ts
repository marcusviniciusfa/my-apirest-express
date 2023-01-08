export class NotFoundError extends Error {
  readonly statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 404
  }
}
