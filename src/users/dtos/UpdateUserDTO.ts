export interface UpdateUserDTO {
  id: string
  name: string
  email: string
  new_password?: string
  old_password: string
}
