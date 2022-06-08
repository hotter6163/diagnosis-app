import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import {
  Button,
  Typography
} from '@mui/material'

import {
  fetchAllRegends,
  RegendType
} from 'app/firebase/firestore/regends'

type PageProps = {
  regendsList: RegendType[]
}

const Diagnosis:NextPage = () => {
  const handleClickResult = () => {
    Router.push('/diagnosis/results')
  }

  return (
    <main>
      <Typography variant="h1" component="h1" gutterBottom className="text-3xl">
        Apexキャラ診断
      </Typography>
      <Typography variant="h2" component="h2" gutterBottom className="text-xl">
        以下のボタンを順番に選択してください。
      </Typography>
      <Button variant="contained" className="bg-blue-500" size="large" onClick={handleClickResult}>
        診断結果を見る
      </Button>
    </main>
  )
}


export default Diagnosis
