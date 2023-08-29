import '../global.css'
import { Box, Flex, Image } from '@chakra-ui/react'
import logoImg from './assets/logo.png'
import bubbleImg from './assets/bubble.png'
import { SetQuestionQty } from './features/SetQuestionQty'
import { useState } from 'react'

// enum used to declare what type of data is allowed to be used in the useState for Steps. In this case, we're using it to dictate what stage of play the user is in whilst they use the app.

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
        return <SetQuestionQty max={30} min={5} step={5} defaultVal={10} />
      case Step.SetQuestionCategory:
        return <></>
      case Step.SetQuestionDifficulty:
        return <></>
      case Step.Play:
        return <></>
      case Step.ScoreScreen:
        return <></>
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
