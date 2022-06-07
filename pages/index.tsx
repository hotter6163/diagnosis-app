import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {
  Box,
  Button,
  Typography
} from '@mui/material'

const Home: NextPage = () => {
  return (
    <main>
      <Box sx={{ backgroundImage: ''}}>
        <h1 className="text-3xl">
          Apexキャラ
        </h1>
        <Button variant="contained" className="bg-blue-500" size="large">
          <Link href="/diagnosis">
            <a>診断する</a>
          </Link>
        </Button>
      </Box>
    </main>
  )
}

export default Home
