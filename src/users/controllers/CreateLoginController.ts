import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { CreateLoginUseCase } from '../use-cases/CreateLoginUseCase'
import { IUsersController } from './IUsersController'

export class CreateLoginController implements IUsersController {
  private createLoginUseCase: CreateLoginUseCase

  constructor() {
    this.createLoginUseCase = container.resolve(CreateLoginUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const { user, accessToken, refreshToken } = await this.createLoginUseCase.execute({ email, password })
    const profileDTO = userViewModel.toHttp(user)
    return res.status(201).json({ user: profileDTO, accessToken, refreshToken })
  }
}
