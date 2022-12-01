export interface LoginType {
  email: string
  password: string
}

export interface UserProfileType {
  id: string
  name: string
  email: string
}

export interface BookType {
  id: string
  title: string
  description: string
}

export interface BookFormErrorsType {
  title?: string | null
  description?: string | null
}
