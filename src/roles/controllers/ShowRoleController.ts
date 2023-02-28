import { roleViewModel } from '@/roles/http/view-models/RoleViewModel'
import { ShowRoleUseCase } from '@/roles/use-cases/ShowRoleUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IRolesController } from './IRolesController'

export class ShowRoleController implements IRolesController {
  private showRoleUseCase: ShowRoleUseCase

  constructor() {
    this.showRoleUseCase = container.resolve(ShowRoleUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const role = await this.showRoleUseCase.execute({ id })
    const roleDTO = roleViewModel.toHttp(role)
    return res.status(200).json(roleDTO)
  }
}
