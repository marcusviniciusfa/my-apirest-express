import { RolesRepository } from '@roles/repositories/RolesRepository'
import { createRolesController } from '@roles/use-cases/create-role'
import { listRolesController } from '@roles/use-cases/list-roles'
import { Router } from 'express'

const rolesRouter = Router()
const rolesRepository = new RolesRepository()

rolesRouter.post('/', (req, res) => createRolesController.handler(req, res))

rolesRouter.get('/', (req, res) => listRolesController.handler(req, res))

export { rolesRouter }
