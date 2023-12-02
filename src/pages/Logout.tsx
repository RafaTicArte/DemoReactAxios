import { useEffect } from 'react'
import { getToken, setToken } from '../hooks/UseToken'
import { useNavigate } from 'react-router-dom'
import { ApiLogout } from '../services/Api'
import { ErrorResponseType } from '../hooks/Types'
import Typography from '@mui/material/Typography'

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
      .catch((error: ErrorResponseType) => {
        console.log('Logout error..')
        console.log(error.message)
        setToken('')
      })
  }, [navigate])

  return (
    <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
      Logout...
    </Typography>
  )
}

export default Logout
