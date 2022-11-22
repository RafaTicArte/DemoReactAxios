export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const getToken = (): string => {
  const token: string | null = localStorage.getItem('token')
  if (token === null) return ''
  else return token
}
