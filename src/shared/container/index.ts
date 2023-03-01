import '@/roles/container'
import '@/users/container'
import { container } from 'tsyringe'
import { ITranslator } from '../translation/ITranslator'
import { Translator } from '../translation/Translator'

container.registerSingleton<ITranslator>('Translator', Translator)
export const translator = container.resolve(Translator)
