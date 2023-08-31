import { useEffect, useState } from 'react'
import { QuizItem } from '../../types/quiz-types'
import {
  Flex,
  Heading,
  RadioGroup,
  SimpleGrid,
  Radio,
  Text,
  HStack,
  Box
} from '@chakra-ui/react'
import Lottie from 'lottie-react'
import correctAnim from '../../assets/lottie/correct.json'
import incorrectAnim from '../../assets/lottie/incorrect.json'
import { Timer } from './Timer'

// 1. Passing the Quiz Array (of QuizItems) into the PlayQuiz component.
// 2. CurrentQuizItemIndex is initialized and is given a default state of 0, or the first question returned in the Quiz Prop.
// 3. currentQuizItem is an object that retrieves the individual QuizItem information for the currentQuizItemIndex - correct_answer, incorrect_answers, question, etc.
// 4. availableAnswers is initialized as an empty array that expects strings and will recieve an array built from correct_answer & incorrect_answers later in a useEffect.
// 5. answer is initialized to record the answer that we select inside the radio group.
// 6. Question Status is initialized and expects 3 kinds of states, default state is set to unanswered because on mount we haven't answered a question.
// 7. History is initialized to keep track of the questions that we answered and if they were right or wrong.

export const PlayQuiz = (p: { quiz: QuizItem[] }) => {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0)
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex]
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>()
  const [questionStatus, setQuestionStatus] = useState<
    'valid' | 'invalid' | 'unanswered'
  >('unanswered')
  const [history, setHistory] = useState<boolean[]>([])

  // A boolean value that accepts an answer, will return truthy when the answer we choose matches the correct answer. Used later on for further state management.

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer
  }

  // map used on the availableAnswers array that is populated on mount. Uses the radio component and builds out the UI used to see and answer the question given to us.

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

  // useEffect that combines the answers from the QuizItem Object, sort is used to shuffle the answers for us. The currentQuizItemIndex is passed into the dependency array because the answers should change when a new question is prompted (i.e. when the index is incremented and we move onto the next question)

  useEffect(() => {
    setAvailableAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers
      ].sort(() => Math.random() - 0.5)
    )
  }, [currentQuizItemIndex])

  // useEffect that watches our answer. The logic is used to decide whether or not our answer was right or wrong. Finally, we update history by adding the isValid (correct or incorrect value) to the current history array.

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer)
      if (isValid) {
        setQuestionStatus('valid')
      } else {
        setQuestionStatus('invalid')
      }
      setHistory((prevHistory) => [...prevHistory, isValid])
    }
  }, [answer])

  const renderProgressBar = () => {
    return (
      <HStack>
        {p.quiz.map((quizItem, i) => {
          return (
            <Box
              key={i}
              h={3}
              w={25}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? 'gray.200'
                  : history[i]
                  ? 'green.300'
                  : 'red.300'
              }
            ></Box>
          )
        })}
      </HStack>
    )
  }

  const failQuestion = () => {
    setHistory([...history, false])
    setQuestionStatus('invalid')
  }

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        {renderProgressBar()}
        {questionStatus === 'unanswered' && (
          <Box position={'absolute'} top={50} right={50}>
            <Timer max={10} onFinished={failQuestion} />
          </Box>
        )}
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
