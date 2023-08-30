import { QuizItem } from '../types/quiz-types'

export const PlayQuiz = (p: { quiz: QuizItem[] }) => {
  console.log(p.quiz)
  return <>Play</>
}
