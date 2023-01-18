import { ShowUserDTO } from '@/users/dtos/ShowUserDTO'
import { User } from '../../database/entities/User'

export class UserViewModel {
  static toHttp(user: User): ShowUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      created_at: user.created_at,
      avatar: user.avatar,
    }
  }
}
