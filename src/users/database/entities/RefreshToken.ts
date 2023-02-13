import { randomUUID } from 'node:crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn()
  id?: string

  @Column()
  userId: string

  @Column()
  token: string

  @Column()
  createdAt: Date

  constructor(token: string, userId: string) {
    Object.assign(this, { token, userId, id: randomUUID(), createdAt: new Date() })
  }
}
