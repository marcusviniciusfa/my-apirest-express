import { createRolesController } from '@roles/use-cases/create-role'
import { deleteRolesController } from '@roles/use-cases/delete-role'
import { listRolesController } from '@roles/use-cases/list-roles'
import { showRolesController } from '@roles/use-cases/show-role'
import { updateRolesController } from '@roles/use-cases/update-role'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.post('/', (req, res) => createRolesController.handler(req, res))

rolesRouter.get('/', (req, res) => listRolesController.handler(req, res))

rolesRouter.get('/:id', (req, res) => showRolesController.handler(req, res))

rolesRouter.put('/:id', (req, res) => updateRolesController.handler(req, res))

rolesRouter.delete('/:id', (req, res) => deleteRolesController.handler(req, res))

export { rolesRouter }
