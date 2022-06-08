import type { VFC } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import '@fontsource/roboto/300.css';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      {pageProps.page !== 'top' && <Header />}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

const Header: VFC = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
      　<Image
          src="/apex-logo.png"
          width={35}
          height={35}
          alt='apexのLogo'
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          className="ml-3 font-normal"
        >
          <Link href="/">
            <a>Apexおすすめキャラ診断</a>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
