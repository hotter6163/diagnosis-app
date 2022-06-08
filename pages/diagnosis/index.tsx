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
type AnswersType = { [key: string]: boolean }

const SELECT_BUTTON_CLASSES = "w-2/5 border-solid rounded-lg border-2 text-xl py-4 font-semibold text-black"
const SUBMIT_BUTTON_CLASSES = "border-solid rounded-lg border-2 text-xl w-full"

const MAX_PAGE_NUM = 2

const Diagnosis: NextPage<Props> = ({ questionNums, questions }) => {
  // コンパイル時にエラーが発生するため、型はnumberに設定
  // 本当は 1 <= num <= MAX_PAGE_NUM の型にしたい
  const [pageNum, setPageNum] = useState<number>(1)
  const [answers, setAnswers] = useState<AnswersType>({})

  // 回答をオブジェクトに保存するための関数
  // 引数が必要なため、直でonClickには入れれない
  const handleAnswerClicked = (id: string, answer: boolean) => {
    setAnswers((prevValue) => {
      const clone: AnswersType = Object.assign({}, prevValue)
      clone[id] = answer
      return clone
    })
  }

  // 質問に対しての回答を受け取るためのコンポーネント
  // pageNumでjsonファイルから取得した配列にアクセスし、その要素に合わせてレンダリングしている
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
              ${SELECT_BUTTON_CLASSES}
              ${answers[question.id] === true && "text-white border-blue-400 bg-blue-400"}
            `}
              onClick={() => handleAnswerClicked(question.id, true)}
            >
              はい
            </Button>
            <Button
              className={`
                ${SELECT_BUTTON_CLASSES}
                ${answers[question.id] === false && "text-white border-red-400 bg-red-400"}
              `}
              onClick={() => handleAnswerClicked(question.id, false)}
            >
              いいえ
            </Button>
          </div>
        </div>
      ))}

      {
        // ページ遷移のためのボタン
        // 【疑問点】
        // 基本的にそのページの質問全てに回答していないと次のページに進めない使用にしているため、
        // 診断ボタンは最終ページの全ての回答状況で押せるか動かを判断するようにしていがそれで良いのか？
      }
      <div className="flex">
        <div className="w-1/3 p-1">
          {pageNum !== 1 && (
            <Button
              className={`${SUBMIT_BUTTON_CLASSES}`}
              onClick={() => setPageNum(pageNum-1)}
            >
              戻る
            </Button>
          )}
        </div>
        <div className="w-1/3 p-1">
          {pageNum === MAX_PAGE_NUM && (
            <Button
              className={`${SUBMIT_BUTTON_CLASSES}`}
              disabled={!questions[pageNum-1]["questions"].every((question) => answers[question.id] !== undefined)}
            >
              診断する
            </Button>
          )}
        </div>
        <div className="w-1/3 p-1">
        {pageNum !== MAX_PAGE_NUM && (
          <Button
            className={`${SUBMIT_BUTTON_CLASSES}`}
            onClick={() => setPageNum(pageNum+1)}
            disabled={!questions[pageNum-1]["questions"].every((question) => answers[question.id] !== undefined)}
          >
            次へ
          </Button>
        )}
        </div>
      </div>
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
