import { IRolesRepository } from '@/roles/repositories/IRolesRepository'
import { uploadConfig } from '@/shared/config/upload'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import asyncFileSystem from 'node:fs/promises'
import path from 'node:path'
import { inject, injectable } from 'tsyringe'
import { User } from '../database/entities/User'
import { UpInsertAvatarDTO } from '../dtos/UpInsertAvatarDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class UpInsertAvatarUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository, @inject('RolesRepository') private rolesRepository: IRolesRepository) {}

  async execute({ id, avatar }: UpInsertAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new NotFoundError('user not found 🔎')
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.dest, user.avatar)
      try {
        await asyncFileSystem.unlink(avatarFilePath)
      } catch (error) {}
    }

    user.avatar = avatar
    await this.usersRepository.update(user)
    return user
  }
}
