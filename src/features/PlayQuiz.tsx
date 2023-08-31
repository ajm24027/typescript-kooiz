import { useEffect, useState } from 'react'
import { QuizItem } from '../types/quiz-types'
import {
  Flex,
  Heading,
  RadioGroup,
  SimpleGrid,
  Radio,
  Text
} from '@chakra-ui/react'
import Lottie from 'lottie-react'
import correctAnim from '../assets/lottie/correct.json'
import incorrectAnim from '../assets/lottie/incorrect.json'

// 1. Passing in Quiz which is expected to be an Array of QuizItems. 2. Setting the CurrentQuizItemIndex to 0, which is the first question returned in the response array. 3. Setting the current QuizItem - which is set to whatever the index is at the time. 4. Setting Available Answers to state by including the correct answer and the "spread" incorrect answers into an array of strings.

export const PlayQuiz = (p: { quiz: QuizItem[] }) => {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0)
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex]
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>()
  const [questionStatus, setQuestionStatus] = useState<
    'valid' | 'invalid' | 'unanswered'
  >('unanswered')

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer
  }

  const radioList = availableAnswers.map((availableAnswer: string) => {
    return (
      <Radio key={availableAnswer} value={availableAnswer}>
        <Text
          color={
            questionStatus === 'unanswered'
              ? 'black'
              : isValidAnswer(availableAnswer)
              ? 'green.400'
              : 'red.400'
          }
          dangerouslySetInnerHTML={{ __html: availableAnswer }}
        />
      </Radio>
    )
  })

  useEffect(() => {
    setAvailableAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers
      ].sort(() => Math.random() - 0.5)
    )
  }, [currentQuizItemIndex])

  useEffect(() => {
    if (answer) {
      if (isValidAnswer(answer)) {
        setQuestionStatus('valid')
      } else {
        setQuestionStatus('invalid')
      }
    }
  }, [answer])

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading
          fontSize="3xl"
          mt={100}
          mb={20}
          dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
        />

        <RadioGroup
          value={answer}
          onChange={questionStatus === 'unanswered' ? setAnswer : undefined}
        >
          <SimpleGrid>{radioList}</SimpleGrid>
        </RadioGroup>
        <Lottie
          loop={false}
          style={{ marginTop: 100, height: 150 }}
          animationData={
            questionStatus === 'unanswered'
              ? null
              : questionStatus === 'valid'
              ? correctAnim
              : incorrectAnim
          }
          onComplete={() => {
            setQuestionStatus('unanswered')
            setCurrentQuizItemIndex(currentQuizItemIndex + 1)
          }}
        />
      </Flex>
    </>
  )
}
