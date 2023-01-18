import { inject, injectable } from 'tsyringe'
import { IUsersRepository, UsersPaginateProperties } from '../repositories/IUsersRepository'

interface ListUsersUseCaseParams {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ page, limit }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit
    const skip = (page - 1) * take
    return this.usersRepository.findAll({ page, skip, take })
  }
}
