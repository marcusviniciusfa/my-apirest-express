import { jwtAuth } from '@/shared/auth/JwtAuth'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { Unauthorized } from '@/shared/errors/Unauthorized'
import { createHmac } from 'crypto'
import { inject, injectable } from 'tsyringe'
import { RefreshTokenDTO } from '../dtos/RefreshTokenDTO'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'

export interface UserToken {
  accessToken: string
  refreshToken: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('RefreshTokenRepository') private refreshTokenRepository: IRefreshTokenRepository) {}

  async execute({ refreshTokenHash }: RefreshTokenDTO): Promise<UserToken> {
    const oldRefreshToken = await this.refreshTokenRepository.findByTokenHash(refreshTokenHash)
    if (!oldRefreshToken) {
      throw new Unauthorized('unauthenticated user')
    }
    const { userId } = oldRefreshToken
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new NotFoundError('user not found')
    }
    const accessToken = jwtAuth.createAccessToken({ userId })
    const refreshToken = jwtAuth.createRefreshToken()
    const newRefreshTokenHash = createHmac('sha512', process.env.REFRESH_TOKEN_SECRET).update(refreshToken).digest('hex')
    await this.refreshTokenRepository.save(newRefreshTokenHash, user.id)
    return { accessToken, refreshToken }
  }
}
