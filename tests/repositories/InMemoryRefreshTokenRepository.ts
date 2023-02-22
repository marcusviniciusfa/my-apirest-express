import { RefreshToken } from '@/users/database/entities/RefreshToken'
import { IRefreshTokenRepository } from '@/users/repositories/IRefreshTokenRepository'

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  private refreshTokenDb: Map<string, RefreshToken>

  constructor() {
    this.refreshTokenDb = new Map<string, RefreshToken>()
  }

  async save(tokenHash: string, userId: string): Promise<void> {
    const refreshToken = new RefreshToken(tokenHash, userId)
    this.refreshTokenDb.delete(userId)
    new Promise(resolve => resolve(this.refreshTokenDb.set(tokenHash, refreshToken)))
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken> {
    return new Promise(async resolve => {
      const refreshToken = this.refreshTokenDb.get(tokenHash)
      resolve(refreshToken)
    })
  }
}
