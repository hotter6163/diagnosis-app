import type { GetStaticProps, NextPage } from 'next'
import {
  Button,
  Typography
} from '@mui/material'
import * as fs from 'fs'
import * as path from 'path'
import { useState } from 'react'


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

const BUTTON_CLASSES = "w-2/5 border-solid rounded-lg border-2 text-xl py-4 font-semibold text-black"

const MAX_PAGE_NUM = 2

const Diagnosis: NextPage<Props> = ({ questionNums, questions }) => {
  const [pageNum, setPageNum] = useState<1 | 2>(1)
  const [answers, setAnswers] = useState<AnswersType>({})

  const handleAnswerClicked = (id: string, answer: boolean) => {
    setAnswers((prevValue) => {
      const clone: AnswersType = Object.assign({}, prevValue)
      clone[id] = answer
      return clone
    })
  }

  const questionsComponent = (
    <section className="mt-3 bg-white p-3">
      <Typography
        variant="h2"
        component="h2"
        className="text-2xl font-medium mb-4"
      >
        {questions[pageNum-1]["title"]}
      </Typography>
      {questions[pageNum-1]["questions"].map((question, index) => (
        <div key={question.id} className="mb-3">
          <div className="pb-1 border-b-2 border-yellow-200 text-left">
            <Typography
              variant="inherit"
              component="p"
              className="text-xl font-medium"
            >
              {`Q${index + questionNums[pageNum-1]}：${question.question}`}
            </Typography>
          </div>
          <div className="flex justify-around mt-5 mb-8">
            <Button
            className={`
              ${BUTTON_CLASSES}
              ${answers[question.id] === true && "text-white border-blue-400 bg-blue-400"}
            `}
              onClick={() => handleAnswerClicked(question.id, true)}
            >
              はい
            </Button>
            <Button
              className={`
                ${BUTTON_CLASSES}
                ${answers[question.id] === false && "text-white border-red-400 bg-red-400"}
              `}
              onClick={() => handleAnswerClicked(question.id, false)}
            >
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
      <Button onClick={pageNum-1 === 1 ? () => setPageNum(1) : () => setPageNum(2)}>
        次の質問へ
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
