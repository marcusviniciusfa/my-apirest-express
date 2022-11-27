import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type UpdateRoleParams = {
  id: string
  name: string
}

@injectable()
export class UpdateRoleUseCase {
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ id, name }: UpdateRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }
    const roleAlreadyExixts = await this.rolesRepository.findByName(name)
    if (roleAlreadyExixts && role.id !== roleAlreadyExixts.id) {
      throw new AppError('Role already exists')
    }
    return this.rolesRepository.update({ ...role, name })
  }
}
