import { Role } from '@/roles/entities/Role'
import { randomUUID } from 'node:crypto'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

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

  @ManyToOne(() => Role, {
    cascade: true,
  })
  role: Role

  constructor(name: string, email: string, password: string, isAdmin: boolean, role: Role) {
    Object.assign(this, { name, email, password, isAdmin, role, id: randomUUID(), created_at: new Date() })
  }
}
