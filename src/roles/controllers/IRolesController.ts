import { Request, Response } from 'express'

export interface IRolesController {
  handler<T>(req: Request, res: Response): Promise<Response<T>>
}
