import { RolesRepository } from '@roles/repositories/RolesRepository'
import { ShowRoleController } from './ShowRoleController'
import { ShowRoleUseCase } from './ShowRoleUseCase'

const rolesRepository = RolesRepository.getInstance()
const showRolesUseCase = new ShowRoleUseCase(rolesRepository)
const showRolesController = new ShowRoleController(showRolesUseCase)

export { showRolesController }
