import { RefreshToken } from '../database/entities/RefreshToken'
import { CreateRefreshTokenDTO } from '../dtos/CreateRefreshTokenDTO'

export interface IRefreshTokenRepository {
  create({ token, valid, expires, userId }: CreateRefreshTokenDTO): Promise<RefreshToken>
  findByToken(token: string): Promise<RefreshToken | null>
  update(refreshToken: RefreshToken): Promise<void>
}
