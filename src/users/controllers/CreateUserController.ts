import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { CreateUserUseCase } from '../use-cases/CreateUserUseCase'
import { IUsersController } from './IUsersController'

export class CreateUserController implements IUsersController {
  private createUserUseCase: CreateUserUseCase

  constructor() {
    this.createUserUseCase = container.resolve(CreateUserUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { name, email, password, is_admin: isAdmin, role_id: roleId } = req.body
    const user = await this.createUserUseCase.execute({ name, email, password, isAdmin, roleId })
    const profileDTO = userViewModel.toHttp(user)
    return res.status(201).json(profileDTO)
  }
}
