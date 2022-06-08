import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'

import { RegendType, fetchRegendByEnglishName } from 'app/firebase/firestore/regends'
import { Typography } from '@mui/material'

type Props = {
  regend: RegendType
}

const Result: NextPage<Props> = ({ regend }) => {
  return (
    <main>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        className="text-2xl font-semibold"
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
          className={`text-3xl font-semibold ${regend.textColor}`}
        >
          {regend.name}
        </Typography>
      </div>
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
