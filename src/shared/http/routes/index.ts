import { rolesRouter } from '@/roles/http/routes/roles'
import { NotFoundError } from '@/shared/errors/NotFoundError'
import { usersRouter } from '@/users/http/routes/users'
import { NextFunction, Request, Response, Router } from 'express'

const routes = Router()

routes.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'hello' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

routes.use('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError(`requested path ${req.originalUrl} not found 🔎`))
})

export { routes }
