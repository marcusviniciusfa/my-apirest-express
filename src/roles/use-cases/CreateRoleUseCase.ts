import { Role } from '@/roles/entities/Role'
import { BadRequestError } from '@/shared/errors/BadRequestError'
import { inject, injectable } from 'tsyringe'
import { CreateRoleDTO } from '../dtos/CreateRoleDTO'
import { IRolesRepository } from '../repositories/IRolesRepository'

@injectable()
export class CreateRoleUseCase {
  // Injeção de Dependência/Inversão de Dependência
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExixts = await this.rolesRepository.findByName(name)
    if (roleAlreadyExixts) {
      throw new BadRequestError('role already exists ❌')
    }
    return this.rolesRepository.create({ name })
  }
}
