import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { getToken, setToken } from '../hooks/UseToken'
import { useNavigate } from 'react-router-dom'
import { ApiLogout } from '../services/Api'

const Logout = (): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    if (getToken() === '') {
      console.log('Redirecting login...')
      navigate('/login')
    }

    ApiLogout()
      .then((response) => {
        console.log('Logout...')
        console.log(response.data)
        setToken('')
        navigate('/')
      })
      .catch(() => {
        console.log('Logout error..')
        setToken('')
      })
  }, [])

  return (
    <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
      Logout...
    </Typography>
  )
}

export default Logout
