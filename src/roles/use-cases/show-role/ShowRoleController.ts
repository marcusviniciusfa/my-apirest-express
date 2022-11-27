import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowRoleUseCase } from './ShowRoleUseCase'

export class ShowRoleController {
  private showRoleUseCase: ShowRoleUseCase

  constructor() {
    this.showRoleUseCase = container.resolve(ShowRoleUseCase)
  }

  async handler(req: Request, res: Response) {
    const { id } = req.params
    const role = await this.showRoleUseCase.execute({ id })
    return res.status(200).json(role)
  }
}
