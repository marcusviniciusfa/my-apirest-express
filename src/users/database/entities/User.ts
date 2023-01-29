import { Role } from '@/roles/database/entities/Role'
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

  @Column({ nullable: true })
  avatar?: string

  @Column()
  createdAt: Date

  @ManyToOne(() => Role, {
    cascade: true,
    eager: true,
  })
  role: Role

  constructor(name: string, email: string, password: string, isAdmin: boolean, role: Role) {
    Object.assign(this, { name, email, password, isAdmin, role, id: randomUUID(), createdAt: new Date() })
  }
}
