import { ListRolesUseCase } from '@/roles/use-cases/ListRolesUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { roleViewModel } from '../http/view-models/RoleViewModel'
import { IRolesController } from './IRolesController'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

export class ListRolesController implements IRolesController {
  private listRolesUseCase: ListRolesUseCase

  constructor() {
    this.listRolesUseCase = container.resolve(ListRolesUseCase)
  }

  private queryParamExistsAndIsPositiveNumeric(queryParam: any): boolean {
    return queryParam && !isNaN(Number(queryParam)) && Number(queryParam) > 0
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const page = this.queryParamExistsAndIsPositiveNumeric(req.query.page) ? parseInt(req.query.page as string) : DEFAULT_PAGE
    const limit = this.queryParamExistsAndIsPositiveNumeric(req.query.limit) ? parseInt(req.query.limit as string) : DEFAULT_LIMIT
    const roles = await this.listRolesUseCase.execute({ page, limit })
    return res.status(200).json({
      ...roles,
      data: roles.data.map(role => roleViewModel.toHttp(role)),
    })
  }
}
