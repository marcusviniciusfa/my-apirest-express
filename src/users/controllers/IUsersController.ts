import { Request, Response } from 'express'

export interface IUsersController {
  handler(req: Request, res: Response): Promise<Response>
}
