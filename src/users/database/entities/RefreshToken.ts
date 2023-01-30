import { randomUUID } from 'node:crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn()
  id?: string

  @Column()
  token: string

  @Column()
  valid: boolean

  @Column()
  expires: Date

  @Column()
  createdAt: Date

  @Column()
  userId: string

  constructor(token: string, valid: boolean, expires: Date, userId: string) {
    Object.assign(this, { token, valid, expires, userId, id: randomUUID(), createdAt: new Date() })
  }
}
