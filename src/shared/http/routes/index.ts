import { rolesRouter } from '@/roles/http/routes/roles'
import { usersRouter } from '@/users/http/routes/users'
import { Router } from 'express'

const routes = Router()

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }
