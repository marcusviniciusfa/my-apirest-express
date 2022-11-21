import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

type CreateRoleDTO = {
  name: string
}

export class CreateRoleUseCase {
  // Injeção de Dependência/Inversão de Dependência
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExixts = await this.rolesRepository.findByName(name)
    if (roleAlreadyExixts) {
      throw new AppError('Role already exists')
    }
    return this.rolesRepository.create({ name })
  }
}
