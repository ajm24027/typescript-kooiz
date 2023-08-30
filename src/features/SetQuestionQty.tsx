import { useState } from 'react'
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Heading,
  Button
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

// interface of Props tells the code what to expect when it recieves Props - later in the code we have setQuestionQty = (p : Props), which is the equivalent of writing setQuestionQty = (max, min, step) - which is fine, this makes the code easier to read.

// interface Props {
//   max: number
//   min: number
//   step: number
// }

export const SetQuestionQty = (p: {
  max: number
  min: number
  step: number
  defaultVal: number
  onClickNext: (amount: number) => void
}) => {
  // Here <number> is used after useState to declare that only numbers should be set to state. No need to guess what the slider value should accept.
  const [sliderValue, setSliderValue] = useState<number>(p.defaultVal)

  // We're telling renderMarks() to expect a return value of JSX.Element Array or each of the slider marks that we want to see on our slide bar.
  const renderMarks = (): JSX.Element[] => {
    const marks = []
    for (let index = p.min; index <= p.max; index += p.step) {
      marks.push(
        <SliderMark key={index} ml={-2} pt={4} value={index}>
          {index}
        </SliderMark>
      )
    }
    return marks
  }

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as="h1" fontSize="3xl" mb={20}>
          How many questions?
        </Heading>
        <Slider
          value={sliderValue}
          maxWidth={400}
          max={p.max}
          min={p.min}
          step={p.step}
          colorScheme="yellow"
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
        >
          {renderMarks()}
          <SliderTrack color="yellow">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      <Button
        onClick={() => p.onClickNext(sliderValue)}
        position={'absolute'}
        top={'80%'}
        right={'10'}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Category
      </Button>
    </>
  )
}
