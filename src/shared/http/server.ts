import cors from 'cors'
import express from 'express'
import { routes } from './routes'

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening 👂 on port ${PORT}`)
})
