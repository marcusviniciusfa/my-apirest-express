import { randomUUID } from 'node:crypto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  isAdmin: boolean

  @Column()
  avatar?: string

  @Column()
  created_at: Date

  constructor() {
    this.id = randomUUID()
    this.created_at = new Date()
  }
}
