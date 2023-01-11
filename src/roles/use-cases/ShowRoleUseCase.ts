import { Role } from '@/roles/entities/Role'
import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { inject, injectable } from 'tsyringe'

interface ShowRoleParams {
  id: string
}

@injectable()
export class ShowRoleUseCase {
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ id }: ShowRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new NotFoundError('role not found 🔎')
    }
    return role
  }
}
