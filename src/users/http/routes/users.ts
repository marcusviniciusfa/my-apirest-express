import { EMAIL_PATTERN, PASSWORD_PATTERN, POSITIVE_NUMBER_PATTERN, UUID_PATTERN } from '@/shared/constants'
import { validator } from '@/shared/validator'
import { IUsersController } from '@/users/controllers/IUsersController'
import { Router } from 'express'
import { container } from 'tsyringe'

const createUserController: IUsersController = container.resolve('CreateUserController')
const listUsersController: IUsersController = container.resolve('ListUsersController')
const createLoginController: IUsersController = container.resolve('CreateLoginController')

const usersRouter = Router()

usersRouter.post('/', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', pattern: EMAIL_PATTERN },
        password: { type: 'string', pattern: PASSWORD_PATTERN },
        isAdmin: { type: 'boolean' },
        roleId: { type: 'string', pattern: UUID_PATTERN },
      },
      required: ['name', 'email', 'password', 'isAdmin', 'roleId'],
    },
    req.body,
  )
  return createUserController.handler(req, res)
})

usersRouter.get('/', (req, res) => {
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
  return listUsersController.handler(req, res)
})

usersRouter.post('/login', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        email: { type: 'string', pattern: EMAIL_PATTERN },
        password: { type: 'string', pattern: PASSWORD_PATTERN },
      },
    },
    req.body,
  )
  return createLoginController.handler(req, res)
})

export { usersRouter }
