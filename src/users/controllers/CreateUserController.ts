import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UserViewModel } from '../http/view-models/UserViewModel'
import { CreateUserUseCase } from '../use-cases/CreateUserUseCase'
import { IUsersController } from './IUsersController'

export class CreateUserController implements IUsersController {
  private createUserUseCase: CreateUserUseCase

  constructor() {
    this.createUserUseCase = container.resolve(CreateUserUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isAdmin, roleId } = req.body
    const rawUser = await this.createUserUseCase.execute({ name, email, password, isAdmin, roleId })
    const user = UserViewModel.toHttp(rawUser)
    return res.status(201).json(user)
  }
}
