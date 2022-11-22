import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { getToken } from '../hooks/UseToken'
import { useNavigate } from 'react-router-dom'
import { ApiGetUser } from '../services/Api'
import { UserProfileType } from '../hooks/Types'

const User = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfileType>({ id: '', name: '', email: '' })
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Checking local token... ' + getToken())

    if (getToken() === '') {
      console.log('Redirecting login...')
      navigate('/login')
    }

    ApiGetUser()
      .then((response) => {
        console.log('Get user profile...')
        console.log(response.data)
        setUserProfile(response.data)
      })
      .catch(() => {
        console.log('Not found User Profile...')
      })
  }, [])

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        User profile
      </Typography>
      <Typography component="p" variant="h6" color="text.primary" gutterBottom>
        Id: {userProfile.id}
      </Typography>
      <Typography component="p" variant="h6" color="text.primary" gutterBottom>
        Name: {userProfile.name}
      </Typography>
      <Typography component="p" variant="h6" color="text.primary" gutterBottom>
        Email: {userProfile.email}
      </Typography>
    </>
  )
}

export default User
