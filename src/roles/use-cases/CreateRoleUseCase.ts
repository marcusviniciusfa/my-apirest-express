import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type CreateRoleDTO = {
  name: string
}

@injectable()
export class CreateRoleUseCase {
  // Injeção de Dependência/Inversão de Dependência
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExixts = await this.rolesRepository.findByName(name)
    if (roleAlreadyExixts) {
      throw new AppError('Role already exists')
    }
    return this.rolesRepository.create({ name })
  }
}
