import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import { RegendType, fetchRegendByEnglishName } from 'app/firebase/firestore/regends'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'

type Props = {
  regend: RegendType
}

const Result: NextPage<Props> = ({ regend }) => {
  console.log(typeof regend)

  return (
    <main>
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
    </main>
  )
}

export default Result

export const getServerSideProps: GetServerSideProps = async () => {
  // post以外を弾くように設定
  // 今はコメントアウト
  // if (req.method !== 'POST') {
  //   return {
  //     redirect: {
  //       destination: '/diagnosis',
  //       permanent: false,
  //     },
  //   }
  // }
  const regend = await fetchRegendByEnglishName('bloodhound')
  return {
    props: {
      regend
    }
  }
}

const regendColor = (name: string) => ({
  'pathfinder': 'text-indigo-300',
  'bloodhound': 'text-red-600',
  'gibraltar': 'text-yellow-500',
  'wraith': 'text-purple-600',
  'bangalore': 'text-yellow-700',
  'lifeline': 'text-purple-300',
})[name]
