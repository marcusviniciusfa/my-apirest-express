import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRoleUseCase } from './CreateRoleUseCase'

export class CreateRoleController {
  private createRoleUseCase: CreateRoleUseCase

  constructor() {
    this.createRoleUseCase = container.resolve(CreateRoleUseCase)
  }

  async handler(req: Request, res: Response): Promise<Response> {
    const { name } = req.body
    const role = await this.createRoleUseCase.execute({ name })
    return res.status(201).json(role)
  }
}
