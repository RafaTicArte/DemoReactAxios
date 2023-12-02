import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import '../i18n.js'
import { ApiGetToken } from '../services/Api'
import { setToken, getToken } from '../hooks/UseToken'
import { ErrorResponseType, LoginFormType, LoginType } from '../hooks/Types'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const Login = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  function loginSubmit(values: LoginType, { setSubmitting }: LoginFormType): void {
    console.log('Submitting login...')
    console.log(values)
    setSubmitting(true)

    ApiGetToken(values.email, values.password)
      .then((response) => {
        console.log('Saving local token... ')
        console.log(response.data.token)
        setToken(response.data.token)
        navigate('/user')
      })
      .catch((error: ErrorResponseType) => {
        if (error.response.status == 401) {
          console.log('Usuario o contraseña incorrecta')
          setErrorMessage('Usuario o contraseña incorrecta')
        } else {
          console.log('Login error...')
          console.log(error.message)
          setErrorMessage(error.message)
        }
      })

    setSubmitting(false)
  }

  useEffect(() => {
    console.log('Checking local token... ' + getToken())
    if (getToken() !== '') {
      console.log('Redirecting user profile...')
      navigate('/user')
    }
  })

  return (
    <>
      {errorMessage != '' && <Alert severity="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{ email: 'info@ticarte.com', password: 'password' }}
        onSubmit={loginSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                  label={t('email.label')}
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
                  label={t('password.label')}
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
                  {t('login.label')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default Login
