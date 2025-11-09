'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Signup } from '../../pages/Signup'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function SignupPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Signup />
    </ThemeProvider>
  )
}