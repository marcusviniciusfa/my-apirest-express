import { Request, Response } from 'express'

export interface IUsersController {
  handler<T>(req: Request, res: Response): Promise<Response<T>>
}
