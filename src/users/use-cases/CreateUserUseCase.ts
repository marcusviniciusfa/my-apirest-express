import { Role } from '@/roles/entities/Role'
import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { BadRequestError } from '@/shared/errors/BadRequestError'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { cryptoHelper } from '@/shared/helpers/CryptoHelper'
import { inject, injectable } from 'tsyringe'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ name, email, isAdmin, password, roleId }: CreateUserDTO): Promise<User> {
    const userAlreadyExixts = await this.usersRepository.findByEmail(email)
    if (userAlreadyExixts) {
      throw new BadRequestError('user already exists ❌')
    }
    const role: Role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new NotFoundError('role not found 🔎')
    }
    const encryptedPassword = cryptoHelper.encrypt(password, process.env.ENCRYPTION_KEY)
    const user = this.usersRepository.create({ name, email, isAdmin, password: encryptedPassword, role })
    return user
  }
}
