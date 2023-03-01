import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { inject, injectable } from 'tsyringe'

interface DeleteRoleParams {
  id: string
}

@injectable()
export class DeleteRoleUseCase {
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ id }: DeleteRoleParams): Promise<void> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new NotFoundError('role-not-found')
    }
    this.rolesRepository.delete(role)
  }
}
