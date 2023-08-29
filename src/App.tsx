import '../global.css'
import { Box, Flex, Image } from '@chakra-ui/react'
import logoImg from './assets/logo.png'
import bubbleImg from './assets/bubble.png'
import { SetQuestionQty } from './features/SetQuestionQty'
import { useState } from 'react'

// enum used to declare what type of data is allowed to be used in the useState for Steps. In this case, we're using it to dictated what stage of play the user is in whilst they use the app.

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  ScoreScreen
}

export const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty)

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg}></Image>
    </Flex>
  )

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return <SetQuestionQty />
      case Step.SetQuestionCategory:
        return <SetQuestionQty />
      case Step.SetQuestionDifficulty:
        return <SetQuestionQty />
      case Step.Play:
        return <SetQuestionQty />
      case Step.ScoreScreen:
        return <SetQuestionQty />
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
        <Box>{renderScreenByStep()}</Box>
      </Box>
    </>
  )
}
