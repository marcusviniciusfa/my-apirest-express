export interface IRefreshTokenRepository {
  save(tokenHash: string, userId: string): Promise<void>
  findUserByTokenHash(tokenHash: string): Promise<string>
}
