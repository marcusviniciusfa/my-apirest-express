import { refreshTokenCookie } from '@/shared/helpers/cookie/RefreshTokenCookie'
import { IExtendedResponse } from '@/shared/interfaces/IExtendedResponse'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefreshTokenUseCase } from '../use-cases/RefreshTokenUseCase'
import { IUsersController } from './IUsersController'

export class RefreshTokenController implements IUsersController {
  private refreshTokenUseCase: RefreshTokenUseCase

  constructor() {
    this.refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
  }

  async handler(_req: Request, res: IExtendedResponse): Promise<Response> {
    const { refreshTokenHash } = res.locals
    const { accessToken, refreshToken } = await this.refreshTokenUseCase.execute({ refreshTokenHash })
    refreshTokenCookie.set(res, refreshToken)
    return res.status(201).json({ accessToken })
  }
}
