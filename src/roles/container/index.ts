import { CreateRoleController } from '@roles/controllers/CreateRoleController'
import { DeleteRoleController } from '@roles/controllers/DeleteRoleController'
import { IRolesController } from '@roles/controllers/IRolesController'
import { ListRolesController } from '@roles/controllers/ListRolesController'
import { ShowRoleController } from '@roles/controllers/ShowRoleController'
import { UpdateRoleController } from '@roles/controllers/UpdateRoleController'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { container } from 'tsyringe'

container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)
container.registerSingleton<IRolesController>('CreateRoleController', CreateRoleController)
container.registerSingleton<IRolesController>('DeleteRoleController', DeleteRoleController)
container.registerSingleton<IRolesController>('ListRoleController', ListRolesController)
container.registerSingleton<IRolesController>('ShowRoleController', ShowRoleController)
container.registerSingleton<IRolesController>('UpdateRoleController', UpdateRoleController)
