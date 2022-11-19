import { RolesRepository } from '@roles/repositories/RolesRepository'
import { Router } from 'express'

const rolesRouter = Router()
const rolesRepository = new RolesRepository()

rolesRouter.post('/', (req, res) => {
  const { name } = req.body
  const roleAlreadyExixts = rolesRepository.findByNAme(name)
  if (roleAlreadyExixts) {
    return res.status(400).json({ error: 'Role already exists' })
  }
  const role = rolesRepository.create({ name })
  return res.status(201).json(role)
})

rolesRouter.get('/', (_req, res) => {
  const roles = rolesRepository.findAll()
  return res.status(200).json(roles)
})

export { rolesRouter }
