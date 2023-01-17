/* eslint-disable prettier/prettier */
import { Role } from '@/roles/database/entities/Role'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export class RoleSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(dataSource: DataSource, _factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(Role)
    await repository.insert([
      new Role('manager'),
      new Role('agilist'),
      new Role('dev front-end'),
      new Role('dev back-end'),
      new Role('tester qa')
    ])
  }
}
