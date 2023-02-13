import { Client, Entity, Schema } from 'redis-om'

const client = new Client()
await client.open('redis://localhost:6379')

class RefreshTokenUser extends Entity {}

const refreshTokenUserSchema = new Schema(RefreshTokenUser, {
  tokenHash: { type: 'string' },
})

const refreshTokenUserRepository = client.fetchRepository(refreshTokenUserSchema)
const refreshTokenUser = refreshTokenUserRepository.createEntity({ ['qw123e4r5t']: 'user_1' })
refreshTokenUserRepository.save(refreshTokenUser)
