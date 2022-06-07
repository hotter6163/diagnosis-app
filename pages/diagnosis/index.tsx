import type { NextPage } from 'next'
import {
  Button,
  Typography
} from '@mui/material'

import { fetcherFirestore, assertIsCharacters } from 'app/firebase/firestore'

const Diagnosis = () => {
  const result = fetcherFirestore('character')
  console.log(result)

  return (
    <main>
      <Typography variant="h1" component="h1" gutterBottom className="text-3xl">
        Apexキャラ診断
      </Typography>
      <Typography variant="h2" component="h2" gutterBottom className="text-xl">
        以下のボタンを順番に選択してください。
      </Typography>
      <Button variant="contained" className="bg-blue-500" size="large">
        診断結果を見る
      </Button>
    </main>
  )
}

export default Diagnosis
