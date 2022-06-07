import type { NextPage } from 'next'
import Link from 'next/link'
import {
  Box,
  Button,
  Typography
} from '@mui/material'

import backgroundImage from 'public/background-top.jpg'
import { fetcherFirestore, assertIsCharacters } from 'app/firebase/firestore'

const Home: NextPage = ({ regendsList }) => {
  return (
    <main>
      <Box sx={{ backgroundImage: backgroundImage }}>
        <Typography variant="h1" component="h1" gutterBottom className="text-3xl">
          Apexキャラ診断
        </Typography>
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
