import { Role } from '@roles/entities/Role'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'

type CreateRoleDTO = {
  name: string
}

type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type RolesPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Role[]
}

export class RolesRepository {
  private repository: Repository<Role>
  private static instance: RolesRepository

  private constructor() {
    this.repository = dataSource.getRepository(Role)
  }

  /**
   * Singleton Pattern
   * @returns RolesRepository
   */
  static getInstance(): RolesRepository {
    if (!RolesRepository.instance) {
      RolesRepository.instance = new RolesRepository()
    }
    return RolesRepository.instance
  }

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = this.repository.create(new Role(name))
    return this.repository.save(role)
  }

  async update(role: Role): Promise<Role> {
    return this.repository.save(role)
  }

  async delete(role: Role): Promise<void> {
    await this.repository.remove(role)
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repository.findOneBy({ name })
  }

  async findById(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id })
  }

  async findAll({ page, skip, take }: PaginateParams): Promise<RolesPaginateProperties> {
    const [roles, count] = await this.repository.createQueryBuilder().skip(skip).take(take).getManyAndCount()

    const result: RolesPaginateProperties = {
      per_page: take,
      current_page: page,
      total: count,
      data: roles,
    }

    return result
  }
}
