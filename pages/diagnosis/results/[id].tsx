import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Typography } from '@mui/material'

import { fetchAllRegends, assertIsRegends } from 'app/firebase/firestore/regends'


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
  const fetchedData = await fetchAllRegends()

  const paths = fetchedData.map((regend) => {
    return {
      params: {
        id: regend.englishName
      }
    }
  })
  return {
    paths,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      englishName: params.id
    }
  }
};
