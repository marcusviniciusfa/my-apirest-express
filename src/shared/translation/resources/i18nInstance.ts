import i18next, { InitOptions } from 'i18next'
import fsBackend from 'i18next-fs-backend'
import { join } from 'node:path'

const options: InitOptions = {
  load: 'all',
  lng: 'en',
  fallbackLng: 'en',
  preload: ['en', 'pt-br'],
  ns: ['translations'],
  lowerCaseLng: true,
  interpolation: { escapeValue: false },
}

i18next.use(new fsBackend(null, { loadPath: join(__dirname, '/{{lng}}/{{ns}}.json') })).init(options)

export { i18next }
