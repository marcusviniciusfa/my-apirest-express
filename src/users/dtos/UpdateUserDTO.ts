export interface UpdateUserDTO {
  id: string
  name: string
  email: string
  newPassword?: string
  oldPassword: string
}
