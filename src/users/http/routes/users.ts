import { uploadConfig } from '@/shared/config/upload'
import { PATTERN } from '@/shared/constants'
import { validator } from '@/shared/validator'
import { IUsersController } from '@/users/controllers/IUsersController'
import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'

const createUserController: IUsersController = container.resolve('CreateUserController')
const listUsersController: IUsersController = container.resolve('ListUsersController')
const createLoginController: IUsersController = container.resolve('CreateLoginController')
const upInsertAvatarController: IUsersController = container.resolve('UpInsertAvatarController')
const showProfileController: IUsersController = container.resolve('ShowProfileController')
const updateUserController: IUsersController = container.resolve('UpdateUserController')

const usersRouter = Router()

usersRouter.post('/', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', pattern: PATTERN.EMAIL },
        password: { type: 'string', pattern: PATTERN.PASSWORD },
        isAdmin: { type: 'boolean' },
        roleId: { type: 'string', pattern: PATTERN.UUID },
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
        page: { type: 'string', pattern: PATTERN.POSITIVE_NUMBER },
        limit: { type: 'string', pattern: PATTERN.POSITIVE_NUMBER },
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
        email: { type: 'string', pattern: PATTERN.EMAIL },
        password: { type: 'string', pattern: PATTERN.PASSWORD },
      },
      required: ['email', 'password'],
    },
    req.body,
  )
  return createLoginController.handler(req, res)
})

usersRouter.post('/profile', multer(uploadConfig).single('file'), (req, res) => {
  validator(
    {
      type: 'object',
      required: ['file'],
    },
    req,
  )
  return upInsertAvatarController.handler(req, res)
})

usersRouter.get('/profile/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: PATTERN.UUID },
      },
      required: ['id'],
    },
    req.params,
  )
  return showProfileController.handler(req, res)
})

usersRouter.put('/profile/:id', (req, res) => {
  validator(
    {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: PATTERN.UUID },
        name: { type: 'string' },
        email: { type: 'string', pattern: PATTERN.EMAIL },
        old_password: { type: 'string', pattern: PATTERN.PASSWORD },
        new_password: { type: 'string', pattern: PATTERN.PASSWORD },
      },
      required: ['id', 'name', 'email', 'old_password'],
    },
    { ...req.body, ...req.params },
  )
  return updateUserController.handler(req, res)
})

export { usersRouter }
