import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'

export class CreateRoleController {
  rolesRepository: RolesRepository

  constructor() {
    this.rolesRepository = new RolesRepository()
  }

  handler(req: Request, res: Response): Response {
    const { name } = req.body
    const roleAlreadyExixts = this.rolesRepository.findByNAme(name)
    if (roleAlreadyExixts) {
      throw new AppError('Role already exists')
    }
    const role = this.rolesRepository.create({ name })
    return res.status(201).json(role)
  }
}
