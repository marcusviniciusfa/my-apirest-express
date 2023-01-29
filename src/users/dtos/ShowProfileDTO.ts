export interface ShowProfileDTO {
  id?: string
  name: string
  email: string
  is_admin: boolean
  role_id: string
  created_at: Date
  avatar_url: string | null
}
