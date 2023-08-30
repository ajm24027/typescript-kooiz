import { useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  VStack
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { QuizDifficulty } from '../types/quiz-types'

export const SetQuizDifficulty = (p: {
  onClickNext: (difficulty: QuizDifficulty) => void
}) => {
  const [difficulty, SetCurrentDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  )

  // Object.values() is a method - it returns an array of the own enumerable property values of an object. In our case '', 'easy', 'medium', 'hard'.
  const radioList = Object.values(QuizDifficulty).map(
    (difficulty: QuizDifficulty) => {
      return (
        <Radio key={difficulty} value={difficulty}>
          <span style={{ textTransform: 'capitalize' }}>
            {difficulty === QuizDifficulty.Mixed ? 'Mixed' : difficulty}
          </span>
        </Radio>
      )
    }
  )

  // Here I know that QuizDifficulty is a string - see ../types/quiz-types.ts - for whatever reason, onChange didn't like SetCurrentDifficulty. To please the RadioGroups need for a string, we are providing instructions that say that difficulty or 'd' is of a string type.

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Which Difficulty?
        </Heading>
      </Flex>
      <RadioGroup
        value={difficulty}
        onChange={SetCurrentDifficulty as (d: string) => void}
      >
        <VStack>{radioList}</VStack>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(difficulty)}
        position={'absolute'}
        top={'80%'}
        right={'10'}
        rightIcon={<ArrowForwardIcon />}
      >
        Play
      </Button>
    </>
  )
}
