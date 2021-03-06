import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { blue, lightGreen } from '@mui/material/colors'
import Home from './pages/Home'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: lightGreen,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}

export default App
