import { randomUUID } from 'node:crypto'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  constructor(name: string) {
    this.id = randomUUID()
    this.createdAt = new Date()
    this.name = name
  }
}
