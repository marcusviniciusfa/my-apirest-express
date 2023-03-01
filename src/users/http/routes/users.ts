import { uploadConfig } from '@/shared/config/upload'
import { refreshTokenHandler } from '@/shared/http/middlewares/refreshTokenHandler'
import { validatorHandler } from '@/shared/http/middlewares/validatorHandler'
import { IUsersController } from '@/users/controllers/IUsersController'
import { Router } from 'express'
import { body, param, query } from 'express-validator'
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
  body('name').isString().withMessage('property-must-be-a-string').notEmpty().withMessage('property-is-required'),
  body('email').isEmail().withMessage('property-must-be-a-email').notEmpty().withMessage('property-is-required'),
  body('password').isLength({ min: 8, max: 16 }).withMessage('property-must-be-a-length-limit').notEmpty().withMessage('property-is-required'),
  body('is_admin').isBoolean().withMessage('property-must-be-a-boolean').notEmpty().withMessage('property-is-required'),
  body('role_id').isString().withMessage('property-must-be-a-string').isUUID('4').withMessage('property-must-be-uuid-v4').notEmpty().withMessage('property-is-required'),
  validatorHandler,
  (req, res) => createUserController.handler(req, res),
)

usersRouter.get('/', query('page').isInt().withMessage('property-must-be-a-int'), query('limit').isInt().withMessage('property-must-be-a-int'), validatorHandler, (req, res) =>
  listUsersController.handler(req, res),
)

usersRouter.post(
  '/login',
  body('email').isEmail().withMessage('property-must-be-a-email').notEmpty().withMessage('property-is-required'),
  body('password').isLength({ min: 8, max: 16 }).withMessage('property-must-be-a-length-limit').notEmpty().withMessage('property-is-required'),
  validatorHandler,
  (req, res) => createLoginController.handler(req, res),
)

usersRouter.post('/login/refresh', refreshTokenHandler, validatorHandler, (_req, res) => refreshTokenController.handler(_req, res))

usersRouter.post('/profile', multer(uploadConfig).single('file'), (req, res) => upInsertAvatarController.handler(req, res))

usersRouter.get('/profile/:id', param('id').isString().withMessage('property-must-be-a-string').isUUID('4').withMessage('property-must-be-uuid-v4'), validatorHandler, (req, res) =>
  showProfileController.handler(req, res),
)

usersRouter.put(
  '/profile/:id',
  param('id').isString().withMessage('property-must-be-a-string').isUUID('4').withMessage('property-must-be-uuid-v4'),
  body('name').isString().withMessage('property-must-be-a-string').notEmpty().withMessage('property-is-required'),
  body('email').isEmail().withMessage('property-must-be-a-email').notEmpty().withMessage('property-is-required'),
  body('old_password').isLength({ min: 8, max: 16 }).withMessage('property-must-be-a-length-limit').notEmpty().withMessage('property-is-required'),
  body('new_password').isLength({ min: 8, max: 16 }).withMessage('property-must-be-a-length-limit'),
  validatorHandler,
  (req, res) => updateProfileController.handler(req, res),
)

export { usersRouter }
