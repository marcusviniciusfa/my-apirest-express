import { Response } from 'express'

export interface IExtendedResponse extends Response<any, { refreshTokenHash: string }> {}
