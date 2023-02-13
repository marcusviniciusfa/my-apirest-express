import { Role } from '@/roles/database/entities/Role'
import { dataSource } from '@/shared/typeorm'
import { Repository } from 'typeorm'
import { User } from '../database/entities/User'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { IUsersRepository, UsersPaginateParams, UsersPaginateProperties } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User)
  }

  async create({ name, email, password, isAdmin, role }: Omit<CreateUserDTO, 'roleId'> & { role: Role }): Promise<User> {
    const user = this.repository.create(new User(name, email, password, isAdmin, role))
    return this.repository.save(user)
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }

  async findByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name })
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async findAll({ page, skip, take }: UsersPaginateParams): Promise<UsersPaginateProperties> {
    const [users, count] = await this.repository.createQueryBuilder('user').leftJoinAndSelect('user.role', 'role.id = user.roleId').skip(skip).take(take).getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    }
    return result
  }
}
