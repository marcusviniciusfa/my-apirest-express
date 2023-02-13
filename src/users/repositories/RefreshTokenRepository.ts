import { dataSource } from '@/shared/typeorm'
import { Repository } from 'typeorm'
import { RefreshToken } from '../database/entities/RefreshToken'
import { IRefreshTokenRepository } from './IRefreshTokenRepository'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private readonly repository: Repository<RefreshToken>

  constructor() {
    this.repository = dataSource.getRepository(RefreshToken)
  }

  async save(tokenHash: string, userId: string): Promise<void> {
    const refreshToken = this.repository.create(new RefreshToken(tokenHash, userId))
    this.repository.save(refreshToken)
  }

  async findUserByTokenHash(token: string): Promise<string> {
    const refreshToken = await this.repository.findOneBy({ token })
    return refreshToken.userId
  }
}
