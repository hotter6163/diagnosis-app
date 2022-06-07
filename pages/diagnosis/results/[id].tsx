import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { fetcherFirestore, assertIsCharacters } from 'app/firebase/firestore'
import { Typography } from '@mui/material'

const Result: NextPage = ({ englishName }) => {
  return (
    <main>
      <Typography variant="h1" component="h1" gutterBottom className="text-3xl">
        診断結果
      </Typography>
      <Typography variant="h2" component="h2" gutterBottom className="text-xl">
        {englishName}
      </Typography>
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
  const { id: englishName } = params
  return {
    props: {
      englishName
    }
  }
};
