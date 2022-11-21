import { RolesPaginateProperties, RolesRepository } from '@roles/repositories/RolesRepository'

type ListRolesUseCaseParams = {
  page: number
  limit: number
}

export class ListRolesUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ page, limit }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
    const take = limit
    const skip = (page - 1) * take
    return this.rolesRepository.findAll({ page, skip, take })
  }
}
