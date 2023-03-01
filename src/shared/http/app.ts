import 'express-async-errors'
// express-async-errors module is the first import
import { uploadConfig } from '@/shared/config/upload'
import '@/shared/container/index'
import '@/shared/translation/resources/i18nInstance'
import swaggerFile from '@/swagger.json'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import { authenticationHandler } from './middlewares/authenticationHandler'
import { detectLanguageHandler } from './middlewares/detectLanguageHandler'
import { errorHandler } from './middlewares/errorHandler'
import { logStackTraceError } from './middlewares/logStackTraceError'
import { notFoundResourceHandler } from './middlewares/notFoundResourceHandler'
import { routes } from './routes/index'

const app: Application = express()
const apiVersion = `/api/v1`

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(detectLanguageHandler)
app.use(`${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerFile, { customSiteTitle: 'Swagger My API Express' }))
app.use(`${apiVersion}/files`, express.static(uploadConfig.dest))
app.use(apiVersion, authenticationHandler, routes)
app.use('*', notFoundResourceHandler)
app.use(logStackTraceError)
app.use(errorHandler)

export { app }
