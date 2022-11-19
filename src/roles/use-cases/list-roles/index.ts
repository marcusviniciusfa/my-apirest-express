import { RolesRepository } from '@roles/repositories/RolesRepository'
import { ListRolesController } from './ListRolesController'
import { ListRolesUseCase } from './ListRolesUseCase'

const rolesRepository = new RolesRepository()
const listRolesUseCase = new ListRolesUseCase(rolesRepository)
const listRolesController = new ListRolesController(listRolesUseCase)

export { listRolesController }
