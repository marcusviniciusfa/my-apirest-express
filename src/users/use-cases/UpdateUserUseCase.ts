import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { BadRequestError } from '@/shared/errors/BadRequestError'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class UpdateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ id, name, email, new_password, old_password }: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new NotFoundError('user not found 🔎')
    }
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
    if (emailAlreadyExists && user.id !== id) {
      throw new BadRequestError(`there is already one user with this email ❌`)
    }
    if (new_password) {
      if (!old_password) {
        throw new BadRequestError(`old password is needed to reset a new one ❌`)
      }
      const oldPasswordIsValid = nativeCrypto.compare(old_password, user.password)
      if (!oldPasswordIsValid) {
        throw new BadRequestError(`old password does not match ❌`)
      }
      user.password = nativeCrypto.encrypt(new_password)
    }
    return this.usersRepository.update({ ...user, name, email })
  }
}
