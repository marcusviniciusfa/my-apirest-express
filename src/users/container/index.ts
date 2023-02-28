import { CreateLoginController } from '@/users/controllers/CreateLoginController'
import { CreateUserController } from '@/users/controllers/CreateUserController'
import { IUsersController } from '@/users/controllers/IUsersController'
import { ListUsersController } from '@/users/controllers/ListUsersController'
import { RefreshTokenController } from '@/users/controllers/RefreshTokenController'
import { ShowProfileController } from '@/users/controllers/ShowProfileController'
import { UpInsertAvatarController } from '@/users/controllers/UpInsertAvatarController'
import { UpdateProfileController } from '@/users/controllers/UpdateProfileController'
import { IRefreshTokenRepository } from '@/users/repositories/IRefreshTokenRepository'
import { IUsersRepository } from '@/users/repositories/IUsersRepository'
import { RefreshTokenRepository } from '@/users/repositories/RefreshTokenRepository'
import { UsersRepository } from '@/users/repositories/UsersRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IRefreshTokenRepository>('RefreshTokenRepository', RefreshTokenRepository)
container.registerSingleton<IUsersController>('CreateUserController', CreateUserController)
container.registerSingleton<IUsersController>('ListUsersController', ListUsersController)
container.registerSingleton<IUsersController>('CreateLoginController', CreateLoginController)
container.registerSingleton<IUsersController>('UpInsertAvatarController', UpInsertAvatarController)
container.registerSingleton<IUsersController>('ShowProfileController', ShowProfileController)
container.registerSingleton<IUsersController>('UpdateProfileController', UpdateProfileController)
container.registerSingleton<IUsersController>('RefreshTokenController', RefreshTokenController)
