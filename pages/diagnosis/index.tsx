import type { GetStaticProps, NextPage } from 'next'
import {
  Button,
  Typography
} from '@mui/material'
import * as fs from 'fs'
import * as path from 'path'
import { useEffect, useState } from 'react'


type QuestionType = {
  id: string
  question: string
}
type PageQuestionsType = {
  title: string
  questions: QuestionType[]
}
type Props = {
  questionNums: number[]
  questions: PageQuestionsType[]
}
type AnswersType = { [key: string]: boolean | null }

const Diagnosis: NextPage<Props> = ({ questionNums, questions }) => {
  const [pageNum, setPageNum] = useState<0 | 1>(0)
  const [answers, setAnswers] = useState<AnswersType>({})

  const handleAnswerClicked = (id: string, answer: boolean) => {
    setAnswers((prevValue) => {
      const clone: AnswersType = Object.assign({}, prevValue)
      clone[id] = answer
      return clone
    })
  }

  useEffect(()=> {
    console.log(answers)
  }, [answers])

  const questionsComponent = (
    <section className="mt-3 bg-white p-3">
      <Typography
        variant="h2"
        component="h2"
        className="text-xl font-medium mb-4"
      >
        {questions[pageNum]["title"]}
      </Typography>
      {questions[pageNum]["questions"].map((question, index) => (
        <div key={question.id} className="mb-3">
          <div className="pb-1 border-b-2 border-yellow-200 text-left">
            <Typography
              variant="inherit"
              component="p"
              className="text-xl font-medium"
            >
              {`Q${index + questionNums[pageNum]}：${question.question}`}
            </Typography>
          </div>
          <div className="flex justify-around">
            <Button
              className="first"
              onClick={() => handleAnswerClicked(question.id, true)}>
              はい
            </Button>
            <Button
              className="last"
              onClick={() => handleAnswerClicked(question.id, false)}>
              いいえ
            </Button>
          </div>
        </div>
      ))}
    </section>
  )

  return (
    <main>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        className="text-3xl font-medium"
      >
        Apexキャラ診断
      </Typography>
      {questionsComponent}
      <Button onClick={pageNum === 1 ? () => setPageNum(0) : () => setPageNum(1)}>
        次のページへ
      </Button>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), 'data', 'questions.json')
  const jsonText = fs.readFileSync(jsonPath, 'utf-8')
  const questions = JSON.parse(jsonText) as PageQuestionsType[]

  const questionNums: number[] = [1]
  questions.forEach((row, index) => {
    questionNums.push(questionNums[index] + row.questions.length)
  })

  return {
    props: {
      questionNums,
      questions
    }
  }
}

export default Diagnosis
