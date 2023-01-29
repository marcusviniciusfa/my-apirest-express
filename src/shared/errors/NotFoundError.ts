export class NotFoundError extends Error {
  readonly statusCode: number

  constructor(message: string) {
    super(message.concat(' 🔎'))
    this.statusCode = 404
  }
}
