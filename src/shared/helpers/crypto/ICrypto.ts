export interface ICrypto {
  encrypt(data: string, key: string): string
  decrypt(data: string, key: string): string
  compare(data: string, encryptData: string, key: string): boolean
}
