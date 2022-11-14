import cors from 'cors'
import express from 'express'

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  return res.json({ message: 'hello' })
})

app.listen(PORT, () => {
  console.log(`Server listening 👂 on port ${PORT}`)
})
