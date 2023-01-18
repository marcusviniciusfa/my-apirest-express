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
  private inputEncoding: Encoding
  private outputEncoding: Encoding

  constructor() {
    this.algorithm = 'aes-192-ecb'
    this.inputEncoding = 'utf-8'
    this.outputEncoding = 'base64'
  }

  encrypt(data: string, key: string) {
    const cipher = createCipheriv(this.algorithm, key, null, null)
    return cipher.update(data, this.inputEncoding, this.outputEncoding).concat(cipher.final(this.outputEncoding))
  }

  decrypt(data: string, key: string): string {
    const decipher = createDecipheriv(this.algorithm, key, null, null)
    return decipher.update(data, this.outputEncoding, this.inputEncoding).concat(decipher.final(this.inputEncoding))
  }

  compare(data: string, encryptData: string, key: string): boolean {
    return data.includes(this.decrypt(encryptData, key))
  }
}

const nativeCrypto = new NativeCrypto()
export { nativeCrypto }
