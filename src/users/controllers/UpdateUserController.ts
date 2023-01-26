import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { UpdateUserUseCase } from '../use-cases/UpdateUserUseCase'
import { IUsersController } from './IUsersController'

export class UpdateUserController implements IUsersController {
  private updateUserUseCase: UpdateUserUseCase

  constructor() {
    this.updateUserUseCase = container.resolve(UpdateUserUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { name, email, new_password, old_password } = req.body
    const { id } = req.params
    const rawUser = await this.updateUserUseCase.execute({ name, email, new_password, old_password, id })
    const user = userViewModel.toHttp(rawUser)
    return res.status(200).json(user)
  }
}
