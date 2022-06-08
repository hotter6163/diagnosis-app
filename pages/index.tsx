import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Button,
  Typography
} from '@mui/material'

const Home: NextPage = () => {
  return (
    <main className="top">
      <Box sx={{ padding: '1rem' }}>
        <Image
          src='/apax-logo-with-title.png'
          width={200}
          height={200}
          alt='apexのLogo'
        />
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          className="text-4xl text-blue-600 font-semibold"
        >
          おすすめ<br />
          レジェンド診断
        </Typography>
        <Typography
          variant="inherit"
          component="p"
          gutterBottom
          className="text-2xl text-block font-medium"
        >
          あなたにあったレジェンドを見つけて<br />
          チャンピオンを目指そう！！
        </Typography>
        <Button variant="contained" className="bg-blue-500 px-8 py-3 m-3">
          <Link href="/diagnosis">
            <a className="text-xl">診断する</a>
          </Link>
        </Button>
      </Box>
    </main>
  )
}

export default Home
