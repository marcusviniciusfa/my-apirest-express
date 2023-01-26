export interface ICrypto {
  encrypt(data: string): string
  decrypt(data: string): string
  compare(data: string, encryptData: string): boolean
}
