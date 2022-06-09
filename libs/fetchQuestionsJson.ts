import * as fs from 'fs'
import * as path from 'path'

type QuestionType = {
  id: string
  question: string
}
export type PageQuestionsType = {
  title: string
  questions: QuestionType[]
}

export const fetchQuestionsJson = (): PageQuestionsType[] => {
  const jsonPath = path.join(process.cwd(), 'data', 'questions.json')
  const jsonText = fs.readFileSync(jsonPath, 'utf-8')
  const questions = JSON.parse(jsonText) as PageQuestionsType[]

  return questions
}
