/* eslint-disable prettier/prettier */
import { Role } from '@/roles/database/entities/Role'
import { nativeCrypto } from '@/shared/helpers/crypto/NativeCrypto'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../entities/User'

export class UserSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(dataSource: DataSource, _factoryManager: SeederFactoryManager) {
    const userRepository = dataSource.getRepository(User)
    const roleRepository = dataSource.getRepository(Role)
    const role = new Role('admin')

    try {
      await roleRepository.insert(role)
      await userRepository.insert(
        new User(
          'admin',
          'user.admin@email.com',
          nativeCrypto.encrypt('12345678'),
          true,
          role
          ),
      )
      console.log('admin user was successfully created! 🎉')
    } catch (error) {
      console.error('could not create admin user ❌')
      throw new Error(error);
    }
  }
}
