import { RolesRepository } from '@roles/repositories/RolesRepository'
import { Router } from 'express'
import { CreateRoleController } from './../../use-cases/create-role/CreateRoleController'

const rolesRouter = Router()
const rolesRepository = new RolesRepository()
const createRoleController = new CreateRoleController()

rolesRouter.post('/', (req, res) => createRoleController.handler(req, res))

rolesRouter.get('/', (_req, res) => {
  const roles = rolesRepository.findAll()
  return res.status(200).json(roles)
})

export { rolesRouter }
