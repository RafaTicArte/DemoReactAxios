import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../i18n.js'
import { getToken } from '../hooks/UseToken'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiAddBook, ApiGetBook, ApiUpdateBook } from '../services/Api'
import { BookFormType, type BookFormErrorsType, type BookType } from '../hooks/Types'
import { Formik } from 'formik'
import { Typography, Box, Button, Grid, TextField } from '@mui/material'

const BookForm = (): JSX.Element => {
  const [book, setBook] = useState<BookType>({ id: '', title: '', description: '' })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const params = useParams<string>()

  useEffect(() => {
    console.log('Checking local token... ' + getToken())

    if (getToken() === '') {
      console.log('Redirecting login...')
      navigate('/login')
    }

    console.log('Get Book... ')
    console.log('Params: ' + params.id)

    if (typeof params.id !== 'undefined' && params.id !== '') {
      ApiGetBook(params.id)
        .then((response) => {
          setBook({
            id: response.data.data.id,
            title: response.data.data.title,
            description: response.data.data.description
          })
          console.log(book)
        })
        .catch(() => {
          console.log('Get Book error...')
        })
    }
  }, [book, navigate, params])

  function validateBook(values: BookType): BookFormErrorsType {
    const errors: BookFormErrorsType = {}

    if (values.title === '') {
      errors.title = t('error_title_required.label')
    } else if (values.title.length < 3) {
      errors.title = t('error_title_characters.label')
    }

    if (values.description === '') {
      errors.description = t('error_description_required.label')
    } else if (values.description.length < 3) {
      errors.description = t('error_description_characters.label')
    }

    return errors
  }

  function onBookSubmit(values: BookType, { setSubmitting }: BookFormType): void {
    setSubmitting(true)

    if (values.id === '') {
      console.log('Adding book...')
      console.log(values)

      ApiAddBook(values)
        .then((response) => {
          console.log(response.data)
          navigate('/books')
        })
        .catch(() => {
          console.log('Add Book error...')
        })
    } else {
      console.log('Updating book...')
      console.log(values)

      ApiUpdateBook(values)
        .then((response) => {
          console.log(response.data)
          navigate('/books')
        })
        .catch(() => {
          console.log('Update Book error...')
        })
    }

    setSubmitting(false)
  }

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        {book.id === '' ? t('new_book.label') : t('update_book.label')}
      </Typography>
      <Formik
        initialValues={book}
        enableReinitialize={true}
        validate={validateBook}
        onSubmit={onBookSubmit}
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
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 3, maxWidth: 400 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label={t('title.label')}
                  value={values.title}
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.title != null}
                  helperText={touched.title === true && errors.title !== '' ? errors.title : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label={t('description.label')}
                  value={values.description}
                  required
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.description != null}
                  helperText={
                    touched.description === true && errors.description !== ''
                      ? errors.description
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ marginRight: 3 }}
                >
                  {book.id === '' ? t('add.label') : t('update.label')}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    resetForm()
                  }}
                >
                  {t('reset.label')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default BookForm
