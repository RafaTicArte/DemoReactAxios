import Axios, { AxiosPromise } from 'axios'
import { ApiUrl } from '../config'
import { getToken } from '../hooks/UseToken'
import {
  BookType,
  LoginResponseType,
  BooksResponseType,
  BookResponseType,
  UserProfileType
} from '../hooks/Types'

const ApiConnect = Axios.create({
  baseURL: ApiUrl,
  headers: {
    'Content-type': 'application/json'
  }
})

export async function ApiGetToken(
  email: string,
  password: string
): AxiosPromise<LoginResponseType> {
  return await ApiConnect.post('login', {
    email,
    password,
    device: navigator.userAgent
  })
}

export async function ApiLogout(): AxiosPromise<LoginResponseType> {
  return await ApiConnect.get('logout', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiGetUser(): AxiosPromise<UserProfileType> {
  return await ApiConnect.get('user', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiGetBooks(page: number): AxiosPromise<BooksResponseType> {
  return await ApiConnect.get('v1/books?page=' + page.toString(), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiGetBook(id: string): AxiosPromise<BookResponseType> {
  return await ApiConnect.get('v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiAddBook(book: BookType): AxiosPromise<BooksResponseType> {
  return await ApiConnect.post(
    'v1/books',
    {
      title: book.title,
      description: book.description
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
}

export async function ApiUpdateBook(book: BookType): AxiosPromise<BooksResponseType> {
  return await ApiConnect.put(
    'v1/books/' + book.id,
    {
      title: book.title,
      description: book.description
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
}

export async function ApiDelBook(id: string): AxiosPromise<BooksResponseType> {
  return await ApiConnect.delete('v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}
