import { Request, Response } from 'express'

export interface IRolesController {
  handler(req: Request, res: Response): Promise<Response>
}
