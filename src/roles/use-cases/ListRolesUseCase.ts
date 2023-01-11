import { IRolesRepository, RolesPaginateProperties } from '@/roles/repositories/IRolesRepository'
import { inject, injectable } from 'tsyringe'

interface ListRolesUseCaseParams {
  page: number
  limit: number
}

@injectable()
export class ListRolesUseCase {
  constructor(@inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ page, limit }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
    const take = limit
    const skip = (page - 1) * take
    return this.rolesRepository.findAll({ page, skip, take })
  }
}
