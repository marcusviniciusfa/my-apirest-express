import { Role } from '@/roles/database/entities/Role'
import { RefreshToken } from '@/users/database/entities/RefreshToken'
import { User } from '@/users/database/entities/User'
import { UserSeeder } from '@/users/database/seeding/UserSeeder'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { CreateRolesTable1668986011952 } from './migrations/1668986011952-CreateRolesTable'
import { CreateUsersTable1673312143744 } from './migrations/1673312143744-CreateUsersTable'
import { AddRoleIdToUsersTable1673313376233 } from './migrations/1673313376233-AddRoleIdToUsersTable'
import { CreateRefreshTokensTable1675093171932 } from './migrations/1675093171932-CreateRefreshTokensTable'

const options: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User, RefreshToken],
  migrations: [CreateRolesTable1668986011952, CreateUsersTable1673312143744, AddRoleIdToUsersTable1673313376233, CreateRefreshTokensTable1675093171932],
  seeds: [UserSeeder],
}

const dataSource = new DataSource(options)

export { dataSource }
