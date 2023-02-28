import { IRolesController } from '@/roles/controllers/IRolesController'
import { validatorHandler } from '@/shared/http/middlewares/validatorHandler'
import { Router } from 'express'
import { body, param, query } from 'express-validator'
import { container } from 'tsyringe'

const createRoleController: IRolesController = container.resolve('CreateRoleController')
const deleteRoleController: IRolesController = container.resolve('DeleteRoleController')
const listRolesController: IRolesController = container.resolve('ListRolesController')
const showRoleController: IRolesController = container.resolve('ShowRoleController')
const updateRoleController: IRolesController = container.resolve('UpdateRoleController')

const rolesRouter = Router()

rolesRouter.post('/', body('name').isString().notEmpty(), validatorHandler, (req, res) => createRoleController.handler(req, res))

rolesRouter.get('/', query('page').isInt(), query('limit').isInt(), validatorHandler, (req, res) => listRolesController.handler(req, res))

rolesRouter.get('/:id', param('id').isString().isUUID('4'), validatorHandler, (req, res) => showRoleController.handler(req, res))

rolesRouter.put('/:id', param('id').isString().isUUID('4'), body('name').isString().notEmpty(), validatorHandler, (req, res) => updateRoleController.handler(req, res))

rolesRouter.delete('/:id', param('id').isString().isUUID('4'), validatorHandler, (req, res) => deleteRoleController.handler(req, res))

export { rolesRouter }
