import { v4 as uuidv4 } from 'uuid'

export class Role {
  readonly id: string
  name: string
  created_at: Date

  constructor(name: string) {
    this.id = uuidv4()
    this.created_at = new Date()
    this.name = name
  }
}
