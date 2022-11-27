import '@shared/container'
import { AppError } from '@shared/errors/AppError'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../swagger.json'
import { routes } from './routes'

const app = express()
app
  .use(cors())
  .use(express.json())
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  .use(routes)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
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

export { app }
