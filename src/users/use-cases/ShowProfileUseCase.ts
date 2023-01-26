import { NotFoundError } from '@/shared/errors/NotFoundError'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface ShowProfileParams {
  userId: string
}

@injectable()
export class ShowProfileUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ userId }: ShowProfileParams): Promise<User> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new NotFoundError('user not found 🔎')
    }
    return user
  }
}
