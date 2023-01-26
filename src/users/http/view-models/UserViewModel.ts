import { ShowProfileDTO } from '@/users/dtos/ShowProfileDTO'
import { User } from '../../database/entities/User'

class UserViewModel {
  toHttp(user: User): ShowProfileDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      created_at: user.created_at,
      avatar_url: this.generateAvatarUrl(user),
    }
  }

  private generateAvatarUrl(user: User): string | null {
    return user.avatar ? `${process.env.API_BASE_URL}/files/${user.avatar}` : null
  }
}

const userViewModel = new UserViewModel()
export { userViewModel }
