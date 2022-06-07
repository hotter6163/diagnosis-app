import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Typography } from '@mui/material'

import { fetcherFirestore, assertIsCharacters } from 'app/firebase/firestore'

type Props = {
  englishName: string
}

type Params = {
  id: string
}

const Result: NextPage<Props> = ({ englishName }) => {
  return (
    <main>
      <Typography variant="h1" component="h1" gutterBottom className="text-3xl">
        診断結果
      </Typography>
      <Typography variant="h2" component="h2" gutterBottom className="text-xl">
        {englishName}
      </Typography>
      <Link href="/">
        <a>top</a>
      </Link>
    </main>
  )
}

export default Result

export const getStaticPaths: GetStaticPaths = async () => {
  const fetchedData = await fetcherFirestore('character')

  assertIsCharacters(fetchedData)

  const paths = fetchedData.map((character) => {
    return {
      params: {
        id: character.englishName
      }
    }
  })
  return {
    paths,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      englishName: params.id
    }
  }
};
