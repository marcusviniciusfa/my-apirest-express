import { Role } from '@/roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1668986011952 } from './migrations/1668986011952-CreateRolesTable'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1668986011952],
})

export { dataSource }
