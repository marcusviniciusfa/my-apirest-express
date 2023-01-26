import { createCipheriv, createDecipheriv, Encoding } from 'node:crypto'
import { ICrypto } from './ICrypto'

/**
 * aes-192-ecb
 * aes = Advanced Encryption Standard
 * 192 = bits da chave (24 caracteres * 8 bits)
 * ecb = Electronic Code Book
 */
export class NativeCrypto implements ICrypto {
  private algorithm: string
  private key: string
  private inputEncoding: Encoding
  private outputEncoding: Encoding

  constructor() {
    Object.assign(this, {
      algorithm: 'aes-192-ecb',
      key: process.env.ENCRYPTION_KEY,
      inputEncoding: 'utf-8',
      outputEncoding: 'base64',
    })
  }

  encrypt(data: string) {
    const cipher = createCipheriv(this.algorithm, this.key, null, null)
    return cipher.update(data, this.inputEncoding, this.outputEncoding).concat(cipher.final(this.outputEncoding))
  }

  decrypt(data: string): string {
    const decipher = createDecipheriv(this.algorithm, this.key, null, null)
    return decipher.update(data, this.outputEncoding, this.inputEncoding).concat(decipher.final(this.inputEncoding))
  }

  compare(data: string, encryptData: string): boolean {
    return data === this.decrypt(encryptData)
  }
}

const nativeCrypto = new NativeCrypto()
export { nativeCrypto }
