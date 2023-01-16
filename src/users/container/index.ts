import { container } from 'tsyringe'
import { CreateUserController } from '../controllers/CreateUserController'
import { IUsersController } from '../controllers/IUsersController'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IUsersController>('CreateUserController', CreateUserController)
