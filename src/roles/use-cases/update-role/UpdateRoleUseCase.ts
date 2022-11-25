import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

type UpdateRoleParams = {
  id: string
  name: string
}

export class UpdateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

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
