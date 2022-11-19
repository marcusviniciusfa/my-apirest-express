import { RolesRepository } from '@roles/repositories/RolesRepository'
import { ListRolesController } from './ListRolesController'
import { ListRolesUseCase } from './ListRolesUseCase'

const rolesRepository = RolesRepository.getInstance()
const listRolesUseCase = new ListRolesUseCase(rolesRepository)
const listRolesController = new ListRolesController(listRolesUseCase)

export { listRolesController }
