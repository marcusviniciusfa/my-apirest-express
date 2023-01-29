import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userViewModel } from '../http/view-models/UserViewModel'
import { ListUsersUseCase } from '../use-cases/ListUsersUseCase'
import { IUsersController } from './IUsersController'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

export class ListUsersController implements IUsersController {
  private listUsersUseCase: ListUsersUseCase

  constructor() {
    this.listUsersUseCase = container.resolve(ListUsersUseCase)
  }

  private queryParamExistsAndIsPositiveNumeric(queryParam: any): boolean {
    return queryParam && !isNaN(Number(queryParam)) && Number(queryParam) > 0
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const page = this.queryParamExistsAndIsPositiveNumeric(req.query.page) ? parseInt(req.query.page as string) : DEFAULT_PAGE
    const limit = this.queryParamExistsAndIsPositiveNumeric(req.query.limit) ? parseInt(req.query.limit as string) : DEFAULT_LIMIT
    const users = await this.listUsersUseCase.execute({ page, limit })
    return res.status(200).json({
      ...users,
      data: users.data.map(user => userViewModel.toHttp(user)),
    })
  }
}
