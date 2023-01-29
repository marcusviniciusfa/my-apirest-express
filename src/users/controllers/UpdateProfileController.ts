import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { UpdateProfileUseCase } from '../use-cases/UpdateProfileUseCase'
import { IUsersController } from './IUsersController'

export class UpdateProfileController implements IUsersController {
  private updateUserUseCase: UpdateProfileUseCase

  constructor() {
    this.updateUserUseCase = container.resolve(UpdateProfileUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { name, email, new_password: newPassword, old_password: oldPassword } = req.body
    const { id } = req.params
    const user = await this.updateUserUseCase.execute({ name, email, newPassword, oldPassword, id })
    const profileDTO = userViewModel.toHttp(user)
    return res.status(200).json(profileDTO)
  }
}
