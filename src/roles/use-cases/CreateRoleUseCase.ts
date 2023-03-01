import { Role } from '@/roles/database/entities/Role'
import { CreateRoleDTO } from '@/roles/dtos/CreateRoleDTO'
import { BadRequestError } from '@/shared/errors/BadRequestError'
import { IRolesRepository } from 'roles/repositories/IRolesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateRoleUseCase {
  // Injeção de Dependência/Inversão de Dependência
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExixts = await this.rolesRepository.findByName(name)
    if (roleAlreadyExixts) {
      throw new BadRequestError('role-already-exists')
    }
    return this.rolesRepository.create({ name })
  }
}
