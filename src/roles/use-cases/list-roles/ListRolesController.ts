import { Request, Response } from 'express'
import { ListRolesUseCase } from './ListRolesUseCase'

export class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase) {}

  handler(_req: Request, res: Response) {
    const roles = this.listRolesUseCase.execute()
    return res.status(200).json(roles)
  }
}
