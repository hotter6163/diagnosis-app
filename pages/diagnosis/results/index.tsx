import type { NextPage, GetServerSideProps } from 'next'

type Props = {
  test: string
}

const Result: NextPage<Props> = ({ test }) => {
  console.log(test)

  return (
    <h1>result</h1>
  )
}

export default Result

export const getServerSideProps: GetServerSideProps = async () => {
  // if (req.method !== 'POST') {
  //   return {
  //     redirect: {
  //       destination: '/diagnosis',
  //       permanent: false,
  //     },
  //   }
  // }
  return {
    props: {
      test: 'test'
    }
  }
}

const diagnosis = () => {
  return
}
