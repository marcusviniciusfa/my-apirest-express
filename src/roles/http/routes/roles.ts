import { IRolesController } from '@/roles/controllers/IRolesController'
import { PATTERN } from '@/shared/constants/index'
import { validator } from '@/shared/validator'
import { Router } from 'express'
import { container } from 'tsyringe'

const createRoleController: IRolesController = container.resolve('CreateRoleController')
const deleteRoleController: IRolesController = container.resolve('DeleteRoleController')
const listRolesController: IRolesController = container.resolve('ListRolesController')
const showRoleController: IRolesController = container.resolve('ShowRoleController')
const updateRoleController: IRolesController = container.resolve('UpdateRoleController')

const rolesRouter = Router()

rolesRouter.post('/', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    req.body,
  )
  return createRoleController.handler(req, res)
})

rolesRouter.get('/', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        page: { type: 'string', pattern: PATTERN.POSITIVE_NUMBER },
        limit: { type: 'string', pattern: PATTERN.POSITIVE_NUMBER },
      },
    },
    req.query,
  )
  return listRolesController.handler(req, res)
})

rolesRouter.get('/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: PATTERN.UUID },
      },
    },
    req.params,
  )
  return showRoleController.handler(req, res)
})

rolesRouter.put('/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: PATTERN.UUID },
        name: { type: 'string' },
      },
      required: ['name'],
    },
    { ...req.params, ...req.body },
  )
  return updateRoleController.handler(req, res)
})

rolesRouter.delete('/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: PATTERN.UUID },
      },
    },
    req.params,
  )
  return deleteRoleController.handler(req, res)
})

export { rolesRouter }
