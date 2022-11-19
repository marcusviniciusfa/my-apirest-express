import { RolesRepository } from '@roles/repositories/RolesRepository'
import { createRolesController } from '@roles/use-cases/create-role'
import { Router } from 'express'

const rolesRouter = Router()
const rolesRepository = new RolesRepository()

rolesRouter.post('/', (req, res) => createRolesController.handler(req, res))

rolesRouter.get('/', (_req, res) => {
  const roles = rolesRepository.findAll()
  return res.status(200).json(roles)
})

export { rolesRouter }
