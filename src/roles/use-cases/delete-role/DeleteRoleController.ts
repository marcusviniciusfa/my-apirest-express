import { Request, Response } from 'express'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

export class DeleteRoleController {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {}

  async handler(req: Request, res: Response) {
    const { id } = req.params
    await this.deleteRoleUseCase.execute({ id })
    return res.status(204).end()
  }
}
