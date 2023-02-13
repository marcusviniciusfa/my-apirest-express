import 'express-async-errors'
// express-async-errors module is the first import
import '@/shared/container'
import swaggerFile from '@/swagger.json'
import cookieParser from 'cookie-parser'
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
const apiVersion = '/api/v1'

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(`${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerFile, { customSiteTitle: 'Swagger My API Express' }))
app.use(`${apiVersion}/files`, express.static(uploadConfig.dest))
app.use(apiVersion, authentication, routes)
app.use('*', notFoundHandler)
app.use(logStackTraceError)
app.use(errorHandler)

export { app }
