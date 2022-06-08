import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
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

const Diagnosis:NextPage<PageProps> = ({ regendsList }) => {
  const renderedRegendsList = regendsList.map(regend => (
    <div key={regend.id}>
      <Typography
        variant="inherit"
        sx={{ display: 'inline' }}
      >
        {regend.name}
      </Typography>
      <Link href={`/diagnosis/results/${regend.englishName}`}>
        <a>結果ページへ</a>
      </Link>
    </div>
  ))

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
      {renderedRegendsList}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchedData = await fetchAllRegends()

  return {
    props: {
      regendsList: fetchedData
    }
  }
}

export default Diagnosis
