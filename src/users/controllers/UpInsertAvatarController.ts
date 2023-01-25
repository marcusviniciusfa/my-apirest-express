import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UserViewModel } from '../http/view-models/UserViewModel'
import { UpInsertAvatarUseCase } from '../use-cases/UpInsertAvatarUseCase'
import { IUsersController } from './IUsersController'

export class UpInsertAvatarController implements IUsersController {
  private upInsertAvatarUseCase: UpInsertAvatarUseCase

  constructor() {
    this.upInsertAvatarUseCase = container.resolve(UpInsertAvatarUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line prettier/prettier
    const { file: { filename: avatar }, user: { id } } = req
    const rawUser = await this.upInsertAvatarUseCase.execute({ id, avatar })
    const user = UserViewModel.toHttp(rawUser)
    return res.status(201).json(user)
  }
}
