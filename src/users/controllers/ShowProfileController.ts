import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { ShowProfileUseCase } from '../use-cases/ShowProfileUseCase'
import { IUsersController } from './IUsersController'

export class ShowProfileController implements IUsersController {
  private showProfileUseCase: ShowProfileUseCase

  constructor() {
    this.showProfileUseCase = container.resolve(ShowProfileUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.params
    const user = await this.showProfileUseCase.execute({ userId })
    const profileDTO = userViewModel.toHttp(user)
    return res.status(200).json(profileDTO)
  }
}
