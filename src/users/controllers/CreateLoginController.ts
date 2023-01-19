import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UserViewModel } from '../http/view-models/UserViewModel'
import { CreateLoginUseCase } from '../use-cases/CreateLoginUseCase'
import { IUsersController } from './IUsersController'

export class CreateLoginController implements IUsersController {
  private createLoginUseCase: CreateLoginUseCase

  constructor() {
    this.createLoginUseCase = container.resolve(CreateLoginUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const { user: rawUser, token } = await this.createLoginUseCase.execute({ email, password })
    const user = UserViewModel.toHttp(rawUser)
    return res.status(201).json({ user, token })
  }
}
