import { EMAIL_PATTERN, PASSWORD_PATTERN, UUID_PATTERN } from '@/shared/constants'
import { validator } from '@/shared/validator'
import { IUsersController } from '@/users/controllers/IUsersController'
import { Router } from 'express'
import { container } from 'tsyringe'

const createUserController: IUsersController = container.resolve('CreateUserController')

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

export { usersRouter }
