import { Role } from '@roles/entities/Role'

type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  private roles: Role[]
  private static instance: RolesRepository

  private constructor() {
    this.roles = []
  }

  static getInstance(): RolesRepository {
    if (!RolesRepository.instance) {
      RolesRepository.instance = new RolesRepository()
    }
    return RolesRepository.instance
  }

  create({ name }: CreateRoleDTO): Role {
    const role: Role = new Role(name)
    this.roles.push(role)
    return role
  }

  findByName(name: string): Role | undefined {
    return this.roles.find(role => role.name === name)
  }

  findAll(): Role[] {
    return this.roles
  }
}
