import { DeleteRoleUseCase } from '@roles/use-cases/DeleteRoleUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IRolesController } from './IRolesController'

export class DeleteRoleController implements IRolesController {
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
