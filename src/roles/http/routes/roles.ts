import { createRolesController } from '@roles/use-cases/create-role'
import { deleteRolesController } from '@roles/use-cases/delete-role'
import { listRolesController } from '@roles/use-cases/list-roles'
import { showRolesController } from '@roles/use-cases/show-role'
import { updateRolesController } from '@roles/use-cases/update-role'
import { POSITIVE_NUMBER_PATTERN, ROLE_NAME_PATTERN, UUID_PATTERN } from '@shared/constants'
import { validator } from '@shared/validator'
import { Router } from 'express'

const rolesRouter = Router()

rolesRouter.post('/', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        name: { type: 'string', pattern: ROLE_NAME_PATTERN },
      },
      required: ['name'],
    },
    req.body,
  )
  return createRolesController.handler(req, res)
})

rolesRouter.get('/', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        page: { type: 'string', pattern: POSITIVE_NUMBER_PATTERN },
        limit: { type: 'string', pattern: POSITIVE_NUMBER_PATTERN },
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
        id: { type: 'string', pattern: UUID_PATTERN },
      },
    },
    req.params,
  )
  return showRolesController.handler(req, res)
})

rolesRouter.put('/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: UUID_PATTERN },
        name: { type: 'string', pattern: ROLE_NAME_PATTERN },
      },
      required: ['name'],
    },
    {
      ...req.params,
      ...req.body,
    },
  )
  return updateRolesController.handler(req, res)
})

rolesRouter.delete('/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: UUID_PATTERN },
      },
    },
    req.params,
  )
  return deleteRolesController.handler(req, res)
})

export { rolesRouter }
