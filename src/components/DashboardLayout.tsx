'use client'

import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Sidebar } from './Sidebar'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
})

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <Box
          component="main"
          className="flex-1 p-6 ml-0"
          sx={{
            transition: 'margin 0.3s ease',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}