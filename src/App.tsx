import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './i18n.js'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppBar, Box, Button, FormControl, Link, MenuItem, Select, Toolbar } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'

const theme = createTheme()

const App = (): JSX.Element => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (event: any): void => {
    void i18n.changeLanguage(event.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Demo React Axios
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button key="login" sx={{ color: '#fff' }}>
                <Link component={NavLink} to="/login" color="inherit">
                  {t('login.label')}
                </Link>
              </Button>
              <Button key="books" sx={{ color: '#fff' }}>
                <Link component={NavLink} to="/books" color="inherit">
                  {t('books.label')}
                </Link>
              </Button>
              <Button key="logout" sx={{ color: '#fff' }}>
                <Link component={NavLink} to="/logout" color="inherit">
                  {t('logout.label')}
                </Link>
              </Button>
              <FormControl size="small">
                <Select
                  sx={{ color: '#ffffff', borderColor: '#ffffff' }}
                  label={t('language.label')}
                  defaultValue="en"
                  onChange={changeLanguage}
                >
                  <MenuItem value={'en'}>{t('english.label')}</MenuItem>
                  <MenuItem value={'es'}>{t('spanish.label')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
