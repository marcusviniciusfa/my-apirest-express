import { dataSource } from '@/shared/typeorm'
import { Repository } from 'typeorm'
import { RefreshToken } from '../database/entities/RefreshToken'
import { CreateRefreshTokenDTO } from '../dtos/CreateRefreshTokenDTO'
import { IRefreshTokenRepository } from './IRefreshTokenRepository'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private readonly repository: Repository<RefreshToken>

  constructor() {
    this.repository = dataSource.getRepository(RefreshToken)
  }

  async create({ token, valid, expires, userId }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.repository.create(new RefreshToken(token, valid, expires, userId))
    return this.repository.save(refreshToken)
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repository.findOneBy({ token })
  }

  async update(refreshToken: RefreshToken): Promise<void> {
    await this.repository.save(refreshToken)
  }
}
