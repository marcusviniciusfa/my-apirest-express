import { RolesRepository } from '@roles/repositories/RolesRepository'
import { DeleteRoleController } from './DeleteRoleController'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

const rolesRepository = RolesRepository.getInstance()
const deleteRolesUseCase = new DeleteRoleUseCase(rolesRepository)
const deleteRolesController = new DeleteRoleController(deleteRolesUseCase)

export { deleteRolesController }
