import { randomUUID } from 'node:crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn()
  id?: string

  @Column()
  tokenHash: string

  @Column()
  userId: string

  @Column()
  createdAt: Date

  constructor(tokenHash: string, userId: string) {
    Object.assign(this, { tokenHash, userId, id: randomUUID(), createdAt: new Date() })
  }
}
