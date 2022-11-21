import { DataSource } from 'typeorm'
import { CreateRolesTable1668986011952 } from './migrations/1668986011952-CreateRolesTable'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [],
  migrations: [CreateRolesTable1668986011952],
})

export { dataSource }
