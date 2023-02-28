import { MILLISECOND } from '@/shared/constants/index'
import { helpDate } from '@/shared/helpers/date/HelpDate'
import { Response } from 'express'

class RefreshTokenCookie {
  private readonly keyToken: string

  constructor() {
    this.keyToken = 'refresh-token'
  }

  set(res: Response, token: string) {
    // eslint-disable-next-line prettier/prettier
    const expires = new Date(helpDate.nowInMilliseconds() + (Number(process.env.REFRESH_TOKEN_DURATION_IN_MINUTES) * MILLISECOND.ONE_MINUTE))
    /**
     * https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies#cookies_permanentes
     * https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies#cookies_secure_e_httponly
     */
    res.cookie(this.keyToken, token, { httpOnly: true, secure: true, expires })
  }
}

const refreshTokenCookie = new RefreshTokenCookie()
export { refreshTokenCookie }
