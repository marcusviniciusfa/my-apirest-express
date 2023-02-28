import 'express-async-errors'
// express-async-errors module is the first import
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import i18next from 'i18next'
import fsBackend from 'i18next-fs-backend'
import translationHttpMiddleware from 'i18next-http-middleware'
import { join } from 'node:path'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../swagger.json'
import { uploadConfig } from '../config/upload'
import '../container/index'
import { authenticationHandler } from './middlewares/authenticationHandler'
import { errorHandler } from './middlewares/errorHandler'
import { logStackTraceError } from './middlewares/logStackTraceError'
import { notFoundResourceHandler } from './middlewares/notFoundResourceHandler'
import { routes } from './routes/index'

const app: Application = express()
const apiVersion = `/api/v1`

i18next
  .use(new fsBackend(null, { loadPath: join(__dirname, '../resources/locales/{{lng}}/{{ns}}.json') }))
  .use(translationHttpMiddleware.LanguageDetector)
  .init({ ns: 'translations', debug: true, fallbackLng: 'en', lowerCaseLng: true })

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(translationHttpMiddleware.handle(i18next, { ignoreRoutes: ['/docs', '/files'] }))
app.use(`${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerFile, { customSiteTitle: 'Swagger My API Express' }))
app.use(`${apiVersion}/files`, express.static(uploadConfig.dest))
app.use(apiVersion, authenticationHandler, routes)
app.use('*', notFoundResourceHandler)
app.use(logStackTraceError)
app.use(errorHandler)

export { app }
