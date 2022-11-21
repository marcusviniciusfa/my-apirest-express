import { Request, Response } from 'express'
import { ShowRoleUseCase } from './ShowRoleUseCase'

export class ShowRoleController {
  constructor(private showRoleUseCase: ShowRoleUseCase) {}

  async handler(req: Request, res: Response) {
    const { id } = req.params
    const role = await this.showRoleUseCase.execute({ id })
    return res.status(200).json(role)
  }
}
