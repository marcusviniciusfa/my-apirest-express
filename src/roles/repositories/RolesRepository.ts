import { Role } from '@/roles/entities/Role'
import { dataSource } from '@/shared/typeorm'
import { Repository } from 'typeorm'
import { CreateRoleDTO, IRolesRepository, PaginateParams, RolesPaginateProperties } from './IRolesRepository'

export class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>

  constructor() {
    this.repository = dataSource.getRepository(Role)
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
