import type { AppProps } from 'next/app'
import Header from '../components/base/Header'
import Footer from '../components/base/Footer'
import 'normalize.css'
import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material'

// Material theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6E14'
    }
  }
})


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="main">
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}


export default MyApp
