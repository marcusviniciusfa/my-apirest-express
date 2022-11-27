import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

export class UpdateRoleController {
  private updateRoleUseCase: UpdateRoleUseCase

  constructor() {
    this.updateRoleUseCase = container.resolve(UpdateRoleUseCase)
  }

  async handler(req: Request, res: Response) {
    const { id } = req.params
    const { name } = req.body
    const role = await this.updateRoleUseCase.execute({ id, name })
    return res.status(200).json(role)
  }
}
