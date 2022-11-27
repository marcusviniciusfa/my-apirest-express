import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

export class DeleteRoleController {
  private deleteRoleUseCase: DeleteRoleUseCase

  constructor() {
    this.deleteRoleUseCase = container.resolve(DeleteRoleUseCase)
  }

  async handler(req: Request, res: Response) {
    const { id } = req.params
    await this.deleteRoleUseCase.execute({ id })
    return res.status(204).end()
  }
}
