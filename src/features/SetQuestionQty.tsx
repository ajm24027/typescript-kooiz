import { useState } from 'react'
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react'

// Here <number> is used after useState to declare that only numbers should be set to state. No need to guess what the slider value should accept.

export const SetQuestionQty = () => {
  const [sliderValue, setSliderValue] = useState<number>(50)

  return (
    <>
      <Slider aria-label="slider-ex-6" onChange={(val) => setSliderValue(val)}>
        <SliderMark value={25}>25%</SliderMark>
        <SliderMark value={50}>50%</SliderMark>
        <SliderMark value={75}>75%</SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue}%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  )
}
