/* eslint-disable no-extra-semi */
import { useState, useEffect } from 'react'
import { QuizCategory } from '../types/quiz-types'
import { QuizAPI } from '../api/quiz-api'
import {
  Heading,
  Flex,
  Button,
  Radio,
  RadioGroup,
  SimpleGrid
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

export const SetQuizCategory = (p: {
  onClickNext: (categoryId: string) => void
}) => {
  const [categories, setCategories] = useState<QuizCategory[]>([])
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
  //   categories[0].id.toString()
  // )

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  // rather than creating an external function called fetchCategories, we can create an internal function to the useEffect by writing an anonymous async function that uses the setter useState to call the asynchronous function `fetchCategories()` that's inside our QuizAPI class.

  useEffect(() => {
    const getCategories = async () => {
      setCategories([
        { id: -1, name: 'mixed' },
        ...(await QuizAPI.fetchCategories())
      ])
    }

    getCategories()
  }, [])

  // ChakraUI Radio component cannot have numbers as values, they require a sting, hence `category.id.toString()`

  const radioList = categories.map((category: QuizCategory) => {
    return (
      <Radio key={category.id} value={category.id.toString()}>
        {category.name}
      </Radio>
    )
  })

  console.log(selectedCategoryId)

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          Which topic?
        </Heading>
      </Flex>

      <RadioGroup
        display={'flex'}
        justifyContent={'center'}
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
      >
        <SimpleGrid columns={[1, 3, 4]} spacing={'4'}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>

      <Button
        onClick={() => p.onClickNext(selectedCategoryId)}
        position={'absolute'}
        top={'80%'}
        right={'10'}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Difficulty
      </Button>
    </>
  )
}
