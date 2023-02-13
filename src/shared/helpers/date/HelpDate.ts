import { MILLISECOND } from '@/shared/constants/index'

class HelpDate {
  nowInMilliseconds() {
    const date = new Date()
    // eslint-disable-next-line prettier/prettier
    return date.getTime() - (date.getTimezoneOffset() * MILLISECOND.ONE_MINUTE)
  }
}

const helpDate = new HelpDate()
export { helpDate }
