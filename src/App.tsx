import { Box, Flex, Image } from '@chakra-ui/react'
import logoImg from './assets/logo.png'
import bubbleImg from './assets/bubble.png'
import '../global.css'
import { useState } from 'react'
import { SetQuestionQty } from './features/SetQuestionQty'
import {
  FetchQuizParams,
  QuizDifficulty,
  QuizType,
  QuizItem
} from './types/quiz-types'
import { SetQuizCategory } from './features/SetQuizCategory'
import { SetQuizDifficulty } from './features/SetQuizDifficulty'
import { QuizAPI } from './api/quiz-api'
import { PlayQuiz } from './features/PlayQuix/PlayQuiz'
import { Score } from './features/Score'

// enum used to declare what type of data is allowed to be used in the useState for Steps. In this case, we're using it to dictate what stage of play the user is in whilst they use the app.

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuizDifficulty,
  Play,
  ScoreScreen
}

export function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty)
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: '',
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple
  })
  const [quiz, setQuiz] = useState<QuizItem[]>([])
  const [history, setHistory] = useState<boolean[]>([])

  console.log(quizParams)

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg}></Image>
    </Flex>
  )

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            max={30}
            min={5}
            step={5}
            defaultVal={10}
            // passing a function that is required in the SetQuestionQty component - saying we want all the params from before, and only update the amount - which will be recoreded by the Slider Component, then setting the step to the SetQuestionCategory Enum.
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount })
              setStep(Step.SetQuestionCategory)
            }}
          />
        )
      case Step.SetQuestionCategory:
        return (
          <SetQuizCategory
            onClickNext={(category: string) => {
              setQuizParams({
                ...quizParams,
                category: category === '-1' ? '' : category
              })
              setStep(Step.SetQuizDifficulty)
            }}
          />
        )
      case Step.SetQuizDifficulty:
        return (
          <SetQuizDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = { ...quizParams, difficulty }
              setQuizParams(params)
              const quizResp = await QuizAPI.fetchQuiz(params)
              if (quizResp.length > 0) {
                setQuiz(await QuizAPI.fetchQuiz(params))
                setStep(Step.Play)
              } else {
                alert(
                  `We could not find ${params.amount} for this category, restarting game! `
                )
                setStep(Step.SetQuestionQty)
              }
            }}
          />
        )
      case Step.Play:
        return (
          <PlayQuiz
            quiz={quiz}
            onFinished={(history_: boolean[]) => {
              setHistory(history_)
              setStep(Step.ScoreScreen)
            }}
          />
        )
      case Step.ScoreScreen:
        return (
          <Score
            history={history}
            onNext={() => setStep(Step.SetQuestionQty)}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Box py={'10'} h="100">
        {header}
        <Image
          src={bubbleImg}
          position={'absolute'}
          zIndex={-1}
          right={-120}
          top={100}
        ></Image>
        <Box mt={100}>{renderScreenByStep()}</Box>
      </Box>
    </>
  )
}
