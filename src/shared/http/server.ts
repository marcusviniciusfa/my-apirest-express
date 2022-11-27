import { dataSource } from '@shared/typeorm'
import 'reflect-metadata'
import { app } from './app'

const PORT = process.env.PORT

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening 👂 on port ${PORT}`)
  })
})
