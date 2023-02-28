import { roleViewModel } from '@/roles/http/view-models/RoleViewModel'
import { UpdateRoleUseCase } from '@/roles/use-cases/UpdateRoleUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IRolesController } from './IRolesController'

export class UpdateRoleController implements IRolesController {
  private updateRoleUseCase: UpdateRoleUseCase

  constructor() {
    this.updateRoleUseCase = container.resolve(UpdateRoleUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name } = req.body
    const role = await this.updateRoleUseCase.execute({ id, name })
    const roleDTO = roleViewModel.toHttp(role)
    return res.status(200).json(roleDTO)
  }
}
