import { ListRolesUseCase } from '@roles/use-cases/ListRolesUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IRolesController } from './IRolesController'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 15

export class ListRolesController implements IRolesController {
  private listRolesUseCase: ListRolesUseCase

  constructor() {
    this.listRolesUseCase = container.resolve(ListRolesUseCase)
  }

  async handler(req: Request, res: Response) {
    const page = req.query.page && !isNaN(Number(req.query.page)) && Number(req.query.page) > 0 ? Number(req.query.page) : DEFAULT_PAGE
    const limit = req.query.limit && !isNaN(Number(req.query.limit)) && Number(req.query.limit) > 0 ? Number(req.query.limit) : DEFAULT_LIMIT
    const roles = await this.listRolesUseCase.execute({ page, limit })
    return res.status(200).json(roles)
  }
}
