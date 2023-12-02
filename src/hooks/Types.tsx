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

export interface LoginFormType {
  setSubmitting: (submit: boolean) => void
}

export interface BookFormType {
  setSubmitting: (submit: boolean) => void
}

export interface BookFormErrorsType {
  title?: string | null
  description?: string | null
}

export interface LoginResponseType {
  token: string
}

export interface BooksResponseType {
  data: BookType[]
  meta: {
    current_page: number
    last_page: number
  }
}

export interface BookResponseType {
  data: BookType
}

export interface ErrorResponseType {
  response: {
    status: number
  }
  message: string
}
