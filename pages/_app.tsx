import { VFC, useState, createContext } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import '@fontsource/roboto/300.css';
import { AppBar, Toolbar, Typography } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const [answers, setAnswers] = useState<AnswersType>({})

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <title>Apexキャラ診断</title>
      </Head>
      {pageProps.page !== 'top' && <Header />}
      <AnswersContext.Provider value={{ answers, setAnswers }}>
        <Component {...pageProps} />
      </AnswersContext.Provider>
    </>
  )
}

export default MyApp

type AnswersType = { [key: string]: boolean }
type ContextType = {
  answers: AnswersType
  setAnswers: React.Dispatch<React.SetStateAction<AnswersType>>
}
export const AnswersContext = createContext<ContextType>({} as ContextType)

const Header: VFC = () => {
  return (
    <AppBar position="static" color="transparent" className="bg-white">
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
