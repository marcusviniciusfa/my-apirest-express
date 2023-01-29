import { ShowProfileDTO } from '@/users/dtos/ShowProfileDTO'
import { User } from '../../database/entities/User'

class UserViewModel {
  toHttp(user: User): ShowProfileDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.isAdmin,
      role_id: user.role.id,
      created_at: user.createdAt,
      avatar_url: this.generateAvatarUrl(user),
    }
  }

  private generateAvatarUrl(user: User): string | null {
    return user.avatar ? `${process.env.API_BASE_URL}/files/${user.avatar}` : null
  }
}

const userViewModel = new UserViewModel()
export { userViewModel }
