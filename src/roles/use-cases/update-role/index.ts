import { RolesRepository } from '@roles/repositories/RolesRepository'
import { UpdateRoleController } from './UpdateRoleController'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

const rolesRepository = RolesRepository.getInstance()
const updateRolesUseCase = new UpdateRoleUseCase(rolesRepository)
const updateRolesController = new UpdateRoleController(updateRolesUseCase)

export { updateRolesController }
