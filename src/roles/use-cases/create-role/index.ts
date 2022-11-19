import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from './CreateRoleController'
import { CreateRoleUseCase } from './CreateRoleUseCase'

const rolesRepository = new RolesRepository()
const createRoleUseCase = new CreateRoleUseCase(rolesRepository)
const createRolesController = new CreateRoleController(createRoleUseCase)

export { createRolesController }
