import { refreshTokenCookie } from '@/shared/helpers/cookie/RefreshTokenCookie'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginUseCase } from '../use-cases/CreateLoginUseCase'
import { IUsersController } from './IUsersController'

export class CreateLoginController implements IUsersController {
  private createLoginUseCase: CreateLoginUseCase

  constructor() {
    this.createLoginUseCase = container.resolve(CreateLoginUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const { accessToken, refreshToken } = await this.createLoginUseCase.execute({ email, password })
    refreshTokenCookie.set(res, refreshToken)
    return res.status(201).json({ accessToken })
  }
}
