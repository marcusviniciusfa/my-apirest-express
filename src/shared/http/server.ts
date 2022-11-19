import { AppError } from '@shared/errors/AppError'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { routes } from './routes'

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`Server listening 👂 on port ${PORT}`)
})
