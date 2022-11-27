import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from '@roles/use-cases/create-role/CreateRoleController'
import { DeleteRoleController } from '@roles/use-cases/delete-role/DeleteRoleController'
import { ListRolesController } from '@roles/use-cases/list-roles/ListRolesController'
import { ShowRoleController } from '@roles/use-cases/show-role/ShowRoleController'
import { UpdateRoleController } from '@roles/use-cases/update-role/UpdateRoleController'
import { container } from 'tsyringe'

container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)

container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)
container.registerSingleton('ListRoleController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
