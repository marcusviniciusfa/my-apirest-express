import 'express-async-errors'
// express-async-errors module is the first import
import '@/shared/container'
import swaggerFile from '@/swagger.json'
import cors from 'cors'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import { authentication } from './middlewares/authentication'
import { errorHandler } from './middlewares/errorHandler'
import { logStackTraceError } from './middlewares/logStackTraceError'
import { routes } from './routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(authentication)
app.use(routes)
app.use(logStackTraceError)
app.use(errorHandler)

export { app }
