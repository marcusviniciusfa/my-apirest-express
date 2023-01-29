import { CreateRoleUseCase } from '@/roles/use-cases/CreateRoleUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { roleViewModel } from '../http/view-models/RoleViewModel'
import { IRolesController } from './IRolesController'

export class CreateRoleController implements IRolesController {
  private createRoleUseCase: CreateRoleUseCase

  constructor() {
    this.createRoleUseCase = container.resolve(CreateRoleUseCase)
  }

  async handler<ShowRoleDTO>(req: Request, res: Response): Promise<Response<ShowRoleDTO>> {
    const { name } = req.body
    const role = await this.createRoleUseCase.execute({ name })
    const roleDTO = roleViewModel.toHttp(role)
    return res.status(201).json(roleDTO)
  }
}
