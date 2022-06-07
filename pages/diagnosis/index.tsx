import type { NextPage } from 'next'
import {
  Button
} from '@mui/material'

const Diagnosis = () => {
  return (
    <main>
      <h1 className="text-3xl">
        Apexキャラ診断
      </h1>
      <h2 className="text-2xl">
        順番に以下の項目を選択してください。
      </h2>
      <Button variant="contained" className="bg-blue-500" size="large">
        診断結果を見る
      </Button>
    </main>
  )
}

export default Diagnosis
