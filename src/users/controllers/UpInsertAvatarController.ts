/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { UpInsertAvatarUseCase } from '../use-cases/UpInsertAvatarUseCase'
import { IUsersController } from './IUsersController'

export class UpInsertAvatarController implements IUsersController {
  private upInsertAvatarUseCase: UpInsertAvatarUseCase

  constructor() {
    this.upInsertAvatarUseCase = container.resolve(UpInsertAvatarUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {

    const { file: { filename: avatar } } = req
    const { user: { id } } = res.locals
    const user = await this.upInsertAvatarUseCase.execute({ id, avatar })
    const profileDTO = userViewModel.toHttp(user)
    return res.status(201).json(profileDTO)
  }
}
