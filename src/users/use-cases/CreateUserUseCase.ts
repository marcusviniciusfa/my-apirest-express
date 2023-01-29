import { Role } from '@/roles/database/entities/Role'
import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { BadRequestError } from '@/shared/errors/BadRequestError'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ name, email, isAdmin, password, roleId }: CreateUserDTO): Promise<User> {
    const userAlreadyExixts = await this.usersRepository.findByEmail(email)
    if (userAlreadyExixts) {
      throw new BadRequestError('user already exists')
    }
    const role: Role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new NotFoundError('role not found')
    }
    const encryptedPassword = nativeCrypto.encrypt(password)
    const user = this.usersRepository.create({ name, email, isAdmin, password: encryptedPassword, roleId })
    return user
  }
}
