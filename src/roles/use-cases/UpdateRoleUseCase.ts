import { Role } from '@/roles/database/entities/Role'
import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { BadRequestError } from '@/shared/errors/BadRequestError'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { inject, injectable } from 'tsyringe'

interface UpdateRoleParams {
  id: string
  name: string
}

@injectable()
export class UpdateRoleUseCase {
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ id, name }: UpdateRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new NotFoundError('role not found')
    }
    const roleAlreadyExixts = await this.rolesRepository.findByName(name)
    if (roleAlreadyExixts && role.id !== roleAlreadyExixts.id) {
      throw new BadRequestError('role already exists')
    }
    return this.rolesRepository.update({ ...role, name })
  }
}
