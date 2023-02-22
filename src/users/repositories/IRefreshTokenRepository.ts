import { RefreshToken } from '../database/entities/RefreshToken'

export interface IRefreshTokenRepository {
  save(tokenHash: string, userId: string): Promise<void>
  findByTokenHash(tokenHash: string): Promise<RefreshToken>
}
