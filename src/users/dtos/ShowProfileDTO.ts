import { User } from '../database/entities/User'

export type ShowProfileDTO = Omit<User, 'password' | 'avatar'> & { avatar_url: string | null }
