import { dataSource } from '@/shared/typeorm/index'
import { RefreshToken } from '@/users/database/entities/RefreshToken'
import { Repository } from 'typeorm'
import { IRefreshTokenRepository } from './IRefreshTokenRepository'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private readonly repository: Repository<RefreshToken>

  constructor() {
    this.repository = dataSource.getRepository(RefreshToken)
  }

  async save(tokenHash: string, userId: string): Promise<void> {
    const refreshToken = this.repository.create(new RefreshToken(tokenHash, userId))
    await this.repository.createQueryBuilder().delete().where('userId = :userId', { userId }).execute()
    this.repository.save(refreshToken)
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken> {
    return this.repository.findOneBy({ tokenHash })
  }
}
