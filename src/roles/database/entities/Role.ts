import { randomUUID } from 'node:crypto'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  constructor(name: string) {
    this.id = randomUUID()
    this.created_at = new Date()
    this.name = name
  }
}
