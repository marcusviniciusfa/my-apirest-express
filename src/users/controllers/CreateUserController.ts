import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from '../use-cases/CreateUserUseCase'
import { IUsersController } from './IUsersController'

export class CreateUserController implements IUsersController {
  private createUserUseCase: CreateUserUseCase

  constructor() {
    this.createUserUseCase = container.resolve(CreateUserUseCase)
  }

  async handler(req: Request, res: Response): Promise<any> {
    const { name, email, password, isAdmin, roleId } = req.body
    const user = await this.createUserUseCase.execute({ name, email, password, isAdmin, roleId })
    return res.status(200).json(user)
  }
}
