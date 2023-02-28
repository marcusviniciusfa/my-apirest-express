import { jwtAuth } from '@/shared/auth/JwtAuth'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { createHmac } from 'node:crypto'
import { inject, injectable } from 'tsyringe'
import { LoginDTO } from '../dtos/LoginDTO'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'

export interface UserToken {
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
    const accessToken = jwtAuth.createAccessToken({}, { subject: user.id })
    const refreshToken = jwtAuth.createRefreshToken()
    const refreshTokenHash = createHmac('sha512', process.env.REFRESH_TOKEN_SECRET).update(refreshToken).digest('hex')
    await this.refreshTokenRepository.save(refreshTokenHash, user.id)
    return { accessToken, refreshToken }
  }
}
