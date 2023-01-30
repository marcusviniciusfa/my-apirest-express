import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { LoginDTO } from '../dtos/LoginDTO'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'

export interface UserToken {
  user: User
  accessToken: string
  refreshToken: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('RefreshTokenRepository') private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute({ email, password }: LoginDTO): Promise<UserToken> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      // não explicativo para confundir usuários maliciosos
      throw new Unauthorized('incorrect email/password combination')
    }
    const correctPassword = nativeCrypto.compare(password, user.password)
    if (!correctPassword) {
      throw new Unauthorized('incorrect email/password combination')
    }
    const accessToken = jwtAuth.getAccessToken({ email }, { subject: user.id })
    const expires = new Date(new Date().getTime() + Number(process.env.REFRESH_DURATION))
    const refreshToken = jwtAuth.getRefreshToken({ email })
    await this.refreshTokenRepository.create({ token: refreshToken, expires, userId: user.id })
    return { user, accessToken, refreshToken }
  }
}
