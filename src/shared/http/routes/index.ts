import { rolesRouter } from '@/roles/http/routes/roles'
import { Router } from 'express'

const routes = Router()

routes.get('/', (_req, res) => {
  return res.json({ message: 'hello' })
})

routes.use('/roles', rolesRouter)

export { routes }
