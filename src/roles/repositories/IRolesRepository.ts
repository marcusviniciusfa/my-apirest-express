import { Role } from '@/roles/database/entities/Role'
import { CreateRoleDTO } from '@/roles/dtos/CreateRoleDTO'

export interface RolesPaginateParams {
  page: number
  skip: number
  take: number
}

export interface RolesPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: Role[]
}

export interface IRolesRepository {
  create({ name }: CreateRoleDTO): Promise<Role>
  update(role: Role): Promise<Role>
  delete(role: Role): Promise<void>
  findByName(name: string): Promise<Role | null>
  findById(id: string): Promise<Role | null>
  findAll({ page, skip, take }: RolesPaginateParams): Promise<RolesPaginateProperties>
}
