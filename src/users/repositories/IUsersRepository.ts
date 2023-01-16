import { Role } from '@/roles/entities/Role'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { User } from '../entities/User'

export interface UsersPaginateParams {
  page: number
  skip: number
  take: number
}

export interface UsersPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: User[]
}

export interface IUsersRepository {
  create({ name, email, password, isAdmin, role }: Omit<CreateUserDTO, 'roleId'> & { role: Role }): Promise<User>
  update(user: User): Promise<User>
  delete(user: User): Promise<void>
  findByName(name: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll({ page, skip, take }: UsersPaginateParams): Promise<UsersPaginateProperties>
}
