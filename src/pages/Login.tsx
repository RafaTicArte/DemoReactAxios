import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { ApiGetToken } from '../services/Api'
import { setToken, getToken } from '../hooks/UseToken'
import { LoginType } from '../hooks/Types'

const Login = (): JSX.Element => {
  const navigate = useNavigate()

  function loginSubmit(values: LoginType, actions: any): void {
    console.log('Submitting login...')
    console.log(values)
    actions.setSubmitting(true)

    ApiGetToken(values.email, values.password)
      .then((response) => {
        console.log('Saving local token... ')
        console.log(response.data.token)
        setToken(response.data.token)
        navigate('/user')
      })
      .catch(() => {
        console.log('Not found API token...')
      })

    actions.setSubmitting(false)
  }

  useEffect(() => {
    console.log('Checking local token... ' + getToken())
    if (getToken() !== '') {
      console.log('Redirecting user profile...')
      navigate('/user')
    }
  })

  return (
    <Formik
      initialValues={{ email: 'loraine.wisozk@example.com', password: 'password' }}
      onSubmit={loginSubmit}
      // validate={validateBasketball}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        values,
        touched,
        errors,
        isSubmitting
      }) => (
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ marginTop: 3, maxWidth: 400 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                required
                value={values.email}
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="password"
                type="password"
                required
                fullWidth
                id="password"
                value={values.password}
                label="Password"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{ marginRight: 3 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  )
}

export default Login
