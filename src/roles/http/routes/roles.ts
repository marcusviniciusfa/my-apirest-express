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

rolesRouter.post('/', body('name').isString().withMessage('property-must-be-a-string').notEmpty().withMessage('property-is-required'), validatorHandler, (req, res) =>
  createRoleController.handler(req, res),
)

rolesRouter.get('/', query('page').isInt().withMessage('property-must-be-a-int'), query('limit').isInt().withMessage('property-must-be-a-int'), validatorHandler, (req, res) =>
  listRolesController.handler(req, res),
)

rolesRouter.get('/:id', param('id').isString().withMessage('property-must-be-a-string').isUUID('4').withMessage('property-must-be-uuid-v4'), validatorHandler, (req, res) =>
  showRoleController.handler(req, res),
)

rolesRouter.put(
  '/:id',
  param('id').isString().withMessage('property-must-be-a-string').isUUID('4').withMessage('property-must-be-uuid-v4'),
  body('name').isString().withMessage('property-must-be-a-string').notEmpty().withMessage('property-is-required'),
  validatorHandler,
  (req, res) => updateRoleController.handler(req, res),
)

rolesRouter.delete('/:id', param('id').isString().withMessage('property-must-be-a-string').isUUID('4').withMessage('property-must-be-uuid-v4'), validatorHandler, (req, res) =>
  deleteRoleController.handler(req, res),
)

export { rolesRouter }
