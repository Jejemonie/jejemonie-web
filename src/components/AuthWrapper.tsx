'use client'

import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'

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

export function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLogin ? (
        <Login onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </ThemeProvider>
  )
}