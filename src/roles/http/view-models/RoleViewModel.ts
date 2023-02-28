import { Role } from '@/roles/database/entities/Role'
import { ShowRoleDTO } from '@/roles/dtos/ShowRoleDTO'

class RoleViewModel {
  toHttp(role: Role): ShowRoleDTO {
    return {
      id: role.id,
      name: role.name,
      created_at: role.createdAt,
    }
  }
}

const roleViewModel = new RoleViewModel()
export { roleViewModel }
