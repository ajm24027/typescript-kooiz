import { Flex, Heading, Image } from '@chakra-ui/react'
import logoImg from './assets/logo.png'

export const App = () => {
  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg}></Image>
    </Flex>
  )

  return <>{header}</>
}
