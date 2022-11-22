import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppBar, Box, Button, Link, Toolbar } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'

const theme = createTheme()

const App = (): JSX.Element => {
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
                  Login
                </Link>
              </Button>
              <Button key="books" sx={{ color: '#fff' }}>
                <Link component={NavLink} to="/books" color="inherit">
                  Books
                </Link>
              </Button>
              <Button key="logout" sx={{ color: '#fff' }}>
                <Link component={NavLink} to="/logout" color="inherit">
                  Logout
                </Link>
              </Button>
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
