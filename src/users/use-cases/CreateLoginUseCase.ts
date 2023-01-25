import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { LoginDTO } from '../dtos/LoginDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'

export interface UserToken {
  user: User
  token: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ email, password }: LoginDTO): Promise<UserToken> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      // não explicativo para confundir usuários maliciosos
      throw new Unauthorized('incorrect email/password combination 🔒')
    }
    const correctPassword = nativeCrypto.compare(password, user.password, process.env.ENCRYPTION_KEY)
    if (!correctPassword) {
      throw new Unauthorized('incorrect email/password combination 🔒')
    }
    const token = jwtAuth.getToken({ email }, { subject: user.id })
    return { user, token }
  }
}
