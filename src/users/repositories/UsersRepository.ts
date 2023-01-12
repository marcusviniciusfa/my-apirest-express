import { dataSource } from '@/shared/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { CreateUserDTO, IUsersRepository, UsersPaginateParams, UsersPaginateProperties } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  constructor(private readonly repository: Repository<User>) {
    this.repository = dataSource.getRepository(User)
  }

  async create({ name, email, password, isAdmin, role }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      isAdmin,
      role,
    })
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
    const [users, count] = await this.repository.createQueryBuilder('UsersRole').leftJoinAndSelect('UsersRoles.role', 'role').skip(skip).take(take).getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    }
    return result
  }
}
