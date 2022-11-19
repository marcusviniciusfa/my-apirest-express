import { RolesRepository } from '@roles/repositories/RolesRepository'
import { Request, Response } from 'express'
import { CreateRoleUseCase } from './CreateRoleUseCase'

export class CreateRoleController {
  rolesRepository: RolesRepository

  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  handler(req: Request, res: Response): Response {
    const { name } = req.body
    const role = this.createRoleUseCase.execute({ name })
    return res.status(201).json(role)
  }
}
