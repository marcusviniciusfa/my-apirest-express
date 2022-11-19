import { Role } from '@roles/entities/Role'

type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  private roles: Role[]

  constructor() {
    this.roles = []
  }

  create({ name }: CreateRoleDTO) {
    const role: Role = new Role(name)
    this.roles.push(role)
    return role
  }
}
