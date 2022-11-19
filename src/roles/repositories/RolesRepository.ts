import { Role } from '@roles/entities/Role'

type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  private roles: Role[]

  constructor() {
    this.roles = []
  }

  create({ name }: CreateRoleDTO): Role {
    const role: Role = new Role(name)
    this.roles.push(role)
    return role
  }

  findByNAme(name: string): Role | undefined {
    return this.roles.find(role => role.name === name)
  }

  findAll(): Role[] {
    return this.roles
  }
}
