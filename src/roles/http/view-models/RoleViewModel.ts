import { ShowRoleDTO } from '@/roles/dtos/ShowRoleDTO'
import { Role } from '../../database/entities/Role'

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
