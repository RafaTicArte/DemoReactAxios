import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../i18n.js'
import { getToken } from '../hooks/UseToken'
import { useNavigate } from 'react-router-dom'
import { ApiDelBook, ApiGetBooks } from '../services/Api'
import { BookType } from '../hooks/Types'
import Typography from '@mui/material/Typography'
import {
  Fab,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Books = (): JSX.Element => {
  const [books, setBooks] = useState<BookType[]>([])
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [deletedBook, setDeletedBook] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    setDeletedBook(false)

    if (getToken() === '') {
      console.log('Redirecting login...')
      navigate('/login')
    }

    ApiGetBooks(page)
      .then((response) => {
        console.log('Get books...')
        console.log(response.data)
        setBooks(response.data.data)
        setPage(response.data.meta.current_page)
        setLastPage(response.data.meta.last_page)
      })
      .catch(() => {
        console.log('Get books error..')
      })
  }, [page, deletedBook, navigate])

  function onChangePage(event: ChangeEvent<unknown>, page: number): void {
    setPage(page)
  }

  function onClickAdd(): void {
    navigate('/books/add')
  }

  function onClickUpdate(id: string): void {
    console.log('Redirecting updating book... ' + id)
    navigate('/books/' + id)
  }

  function onClickDel(id: string): void {
    console.log('Deleting book... ' + id)
    ApiDelBook(id)
      .then((response) => {
        console.log(response.data)
        setDeletedBook(true)
      })
      .catch(() => {
        console.log('Deleting book error..')
      })
  }

  return (
    <>
      <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
        {t('book_list.label')}
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">{t('id.label')}</TableCell>
              <TableCell>{t('title.label')}</TableCell>
              <TableCell>{t('description.label')}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right" component="th" scope="row">
                  {book.id}
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => {
                      onClickUpdate(book.id)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => {
                      onClickDel(book.id)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2}>
        <Pagination count={lastPage} page={page} onChange={onChangePage} />
      </Stack>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={onClickAdd}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default Books
