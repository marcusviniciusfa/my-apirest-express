import { dataSource } from '@shared/typeorm'
import { app } from './app'

const PORT = process.env.PORT

dataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening 👂 on port ${PORT}`)
  })
})
