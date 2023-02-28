import { uploadConfig } from '@/shared/config/upload'
import { refreshTokenHandler } from '@/shared/http/middlewares/refreshTokenHandler'
import { validatorHandler } from '@/shared/http/middlewares/validatorHandler'
import { IUsersController } from '@/users/controllers/IUsersController'
import { Router } from 'express'
import { body, param, query } from 'express-validator'
import i18next from 'i18next'
import multer from 'multer'
import { container } from 'tsyringe'
// eslint-disable-next-line @typescript-eslint/no-var-requires

const createUserController: IUsersController = container.resolve('CreateUserController')
const listUsersController: IUsersController = container.resolve('ListUsersController')
const createLoginController: IUsersController = container.resolve('CreateLoginController')
const upInsertAvatarController: IUsersController = container.resolve('UpInsertAvatarController')
const showProfileController: IUsersController = container.resolve('ShowProfileController')
const updateProfileController: IUsersController = container.resolve('UpdateProfileController')
const refreshTokenController: IUsersController = container.resolve('RefreshTokenController')

const usersRouter = Router()

usersRouter.post(
  '/',
  body('name').isString().notEmpty(),
  body('email').isEmail().notEmpty(),
  body('password').isLength({ min: 8, max: 16 }).notEmpty(),
  body('is_admin').isBoolean().notEmpty(),
  body('role_id').isString().isUUID('4').notEmpty(),
  validatorHandler,
  (req, res) => {
    const message = i18next.t('test-message', { test: 'ok' })
    res.send(message)
  },
  // (req, res) => createUserController.handler(req, res),
)

usersRouter.get('/', query('page').isInt(), query('limit').isInt(), validatorHandler, (req, res) => listUsersController.handler(req, res))

usersRouter.post('/login', body('email').isEmail().notEmpty(), body('password').isLength({ min: 8, max: 16 }).notEmpty(), validatorHandler, (req, res) => createLoginController.handler(req, res))

usersRouter.post('/login/refresh', refreshTokenHandler, validatorHandler, (_req, res) => refreshTokenController.handler(_req, res))

usersRouter.post('/profile', multer(uploadConfig).single('file'), (req, res) => upInsertAvatarController.handler(req, res))

usersRouter.get('/profile/:id', param('id').isString().isUUID('4'), validatorHandler, (req, res) => showProfileController.handler(req, res))

usersRouter.put(
  '/profile/:id',
  param('id').isString().isUUID('4'),
  body('name').isString().notEmpty(),
  body('email').isEmail().notEmpty(),
  body('old_password').isLength({ min: 8, max: 16 }).notEmpty(),
  body('new_password').isLength({ min: 8, max: 16 }),
  validatorHandler,
  (req, res) => updateProfileController.handler(req, res),
)

export { usersRouter }
