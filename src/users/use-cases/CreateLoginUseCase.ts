import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface LoginDTO {
  email: string
  password: string
}

type UserToken = User & { token: string }

@injectable()
export class CreateLoginUseCase {
  constructor(@inject('UserRepository') private userRepository: IUsersRepository) {}

  async execute({ email, password }: LoginDTO): Promise<UserToken> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      // não explicativo para confundir usuários maliciosos
      throw new Unauthorized('incorrect email/password combination 🔒')
    }
    const correctPassword = nativeCrypto.compare(password, user.password, process.env.ENCRYPTION_KEY)
    if (!correctPassword) {
      throw new Unauthorized('incorrect email/password combination 🔒')
    }
    return {
      ...user,
      token: jwtAuth.getToken(email, { subject: user.id }),
    }
  }
}
