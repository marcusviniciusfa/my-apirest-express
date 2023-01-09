import { BadRequestError } from '@/shared/errors/BadRequestError'
import Ajv from 'ajv'
const ajv = new Ajv({ messages: true })

export const validator = (schema: object, data: object) => {
  const validate = ajv.compile(schema)

  if (!validate(data)) {
    throw new BadRequestError(ajv.errorsText(validate.errors))
  }
  return true
}
