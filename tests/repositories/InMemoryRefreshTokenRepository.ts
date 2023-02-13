import { MILLISECOND } from '@/shared/constants/index'
import { IRefreshTokenRepository } from '@/users/repositories/IRefreshTokenRepository'

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  private refreshTokenDb: Map<string, string>

  constructor() {
    this.refreshTokenDb = new Map<string, string>()
  }

  async save(tokenHash: string, userId: string): Promise<void> {
    new Promise(resolve => {
      resolve(this.refreshTokenDb.set(tokenHash, userId))
    })
    setTimeout(async () => {
      await this.delete(tokenHash)
      console.log(`Refresh token ${tokenHash} expired`)
      console.log(this.refreshTokenDb.entries())
    }, Number(process.env.REFRESH_TOKEN_DURATION_IN_MINUTES) * MILLISECOND.ONE_MINUTE)
    console.log(this.refreshTokenDb.entries())
  }

  async findUserByTokenHash(tokenHash: string): Promise<string> {
    return new Promise(async resolve => {
      const userId = this.refreshTokenDb.get(tokenHash)
      await this.delete(tokenHash)
      resolve(userId)
    })
  }

  private async delete(tokenHash: string): Promise<boolean> {
    return new Promise(resolve => {
      resolve(this.refreshTokenDb.delete(tokenHash))
    })
  }
}
