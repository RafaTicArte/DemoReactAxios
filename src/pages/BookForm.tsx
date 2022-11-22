import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { getToken } from '../hooks/UseToken'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiAddBook, ApiGetBook, ApiUpdateBook } from '../services/Api'
import { BookType } from '../hooks/Types'
import { Formik } from 'formik'
import { Box, Button, Grid, TextField } from '@mui/material'

const BookForm = (): JSX.Element => {
  const [book, setBook] = useState<BookType>({ id: '', title: '', description: '' })
  const navigate = useNavigate()
  const params: any = useParams<string>()

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
  }, [])

  function onBookSubmit(values: BookType, actions: any): void {
    actions.setSubmitting(true)

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

    actions.setSubmitting(false)
  }

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        {book.id === '' ? 'New book' : 'Update book'}
      </Typography>
      <Formik
        initialValues={book}
        enableReinitialize={true}
        onSubmit={onBookSubmit}
        // validate={validateBook}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ marginTop: 3, maxWidth: 400 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  value={values.title}
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="description"
                  name="description"
                  multiline
                  rows={4}
                  required
                  fullWidth
                  id="description"
                  value={values.description}
                  label="Description"
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
                  {book.id === '' ? 'Add' : 'Update'}
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
