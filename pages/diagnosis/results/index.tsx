import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import Image from 'next/image'
import { RegendNameType, fetchorRegendByEnglishName, RegendType } from 'app/firebase/firestore/regends'
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import { useContext } from 'react'
import useSWR from 'swr'

import { fetchQuestionsJson } from 'libs/fetchQuestionsJson'
import { AnswersType, AnswersContext } from 'pages/_app'

type Props = {
  ids: string[]
}

const Result: NextPage<Props> = ({ ids }) => {
  const { answers } = useContext(AnswersContext)

  const diagnosisResult = diagnosis(answers)
  const { data } = useSWR(diagnosisResult, fetchorRegendByEnglishName)
  let regend
  if (data) {
    const regendsData = data.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }) as RegendType[]
    regend = regendsData[0]
  }

  return (
    <main>
      {
        regend ? (
          <>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              className="text-2xl font-normal"
            >
              あなたにおすすめのレジェンド
            </Typography>
            <div className="mt-4">
              <Image
              src={`/regends/${regend.englishName}.webp`}
              width={400}
              height={200}
              alt='レジェンドの画像'
              />
            </div>
            <div className="text-left p-4">
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                className={`text-3xl font-semibold ${regendColor(regend.englishName)}`}
              >
                {regend.name}
              </Typography>
            </div>
            <Button variant="contained" className="bg-blue-500" size="large">
              <Link href="/diagnosis">
                <a>もう一度診断する</a>
              </Link>
            </Button>
          </>
        ) : (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <div>
              <CircularProgress color="inherit" />
            </div>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              className={`text-3xl font-semibold`}
            >
              診断中
            </Typography>
          </Backdrop>
        )
      }
    </main>
  )
}

export default Result

export const getStaticProps: GetStaticProps = async () => {
  const questins = fetchQuestionsJson()

  const ids: string[] = []
  questins.forEach(row => {
    row.questions.forEach(cell => {
      ids.push(cell.id)
    })
  })

  return {
    props: {
      ids
    }
  }
}

// 診断ロジック
// とりあえず、trueの数で診断
const diagnosis = (answers: AnswersType): RegendNameType => {
  const trueNum = Object.values(answers).reduce((prevValue, flg) => {
    if (flg) {
      return prevValue + 1
    } else {
      return prevValue
    }
  }, 0)

  let regendName: RegendNameType
  switch (trueNum) {
    case 0:
      regendName = 'bloodhound'
      break
    case 1:
      regendName = 'gibraltar'
      break
    case 2:
      regendName = 'wraith'
      break
    case 3:
      regendName = 'bangalore'
      break
    case 4:
      regendName = 'bloodhound'
      break
    case 5:
      regendName = 'pathfinder'
      break
    case 6:
      regendName = 'lifeline'
      break
    default:
      regendName = 'lifeline'
  }
  return regendName
}

const regendColor = (name: string) => ({
  'pathfinder': 'text-indigo-300',
  'bloodhound': 'text-red-600',
  'gibraltar': 'text-yellow-500',
  'wraith': 'text-purple-600',
  'bangalore': 'text-yellow-700',
  'lifeline': 'text-purple-300',
})[name]
