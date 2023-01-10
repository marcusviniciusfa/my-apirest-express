import { Role } from '@/roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1668986011952 } from './migrations/1668986011952-CreateRolesTable'
import { CreateUsersTable1673312143744 } from './migrations/1673312143744-CreateUsersTable'
import { AddRoleIdToUsersTable1673313376233 } from './migrations/1673313376233-AddRoleIdToUsersTable'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1668986011952, CreateUsersTable1673312143744, AddRoleIdToUsersTable1673313376233],
})

export { dataSource }
