import { Flex, Heading, Text, Button } from '@chakra-ui/react'

export const Score = (p: { history: boolean[]; onNext: () => void }) => {
  const correctAnswers = p.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length

  const renderMessage = () => {
    const correctAnswerPercentage = (correctAnswers * 100) / p.history.length
    if (correctAnswerPercentage < 30) {
      return 'You need more practice'
    } else if (correctAnswerPercentage < 50) {
      return "Not bad! Keep training, you're getting better"
    } else {
      return 'Wow, you did amazing!'
    }
  }

  return (
    <Flex direction={'column'} alignItems={'center'}>
      <Heading fontSize={'3xl'}>Score</Heading>
      <Heading fontSize={'xl'} mt={'5'}>
        {correctAnswers}/{p.history.length}
      </Heading>
      <Text fontWeight={'bold'} mt={20}>
        {renderMessage()}
      </Text>
      <Button
        position={'absolute'}
        top={'80%'}
        right={'10%'}
        onClick={p.onNext}
      >
        New Game
      </Button>
    </Flex>
  )
}
