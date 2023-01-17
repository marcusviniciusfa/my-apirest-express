import { Role } from '@/roles/database/entities/Role'
import { RoleSeeder } from '@/roles/database/seeding/RoleSeeder'
import { User } from '@/users/database/entities/User'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { CreateRolesTable1668986011952 } from './migrations/1668986011952-CreateRolesTable'
import { CreateUsersTable1673312143744 } from './migrations/1673312143744-CreateUsersTable'
import { AddRoleIdToUsersTable1673313376233 } from './migrations/1673313376233-AddRoleIdToUsersTable'

const options: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User],
  migrations: [CreateRolesTable1668986011952, CreateUsersTable1673312143744, AddRoleIdToUsersTable1673313376233],
  seeds: [RoleSeeder],
}

const dataSource = new DataSource(options)

export { dataSource }
