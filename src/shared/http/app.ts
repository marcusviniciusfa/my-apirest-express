import 'express-async-errors'
// express-async-errors module is the first import
import '@/shared/container'
import swaggerFile from '@/swagger.json'
import cors from 'cors'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import { uploadConfig } from '../config/upload'
import { authentication } from './middlewares/authentication'
import { errorHandler } from './middlewares/errorHandler'
import { logStackTraceError } from './middlewares/logStackTraceError'
import { notFoundHandler } from './middlewares/notFoundHandler'
import { routes } from './routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { customSiteTitle: 'Swagger My API Express' }))
app.use('/files', express.static(uploadConfig.dest))
app.use('/api/v1', authentication, routes)
app.use('*', notFoundHandler)
app.use(logStackTraceError)
app.use(errorHandler)

export { app }
