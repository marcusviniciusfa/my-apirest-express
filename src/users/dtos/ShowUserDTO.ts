import { User } from '../database/entities/User'

export type ShowUserDTO = Omit<User, 'password'>
