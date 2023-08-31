import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

// We're declaring the type for the timer variable as a NodeJS.Timer, and we're declaring it globally because both of our useEffects will utilize this timer.
let timer: NodeJS.Timer

// max value and anonymous function passed down from parent
export function Timer(p: { max: number; onFinished: () => void }) {
  // Progress set to state to give the timer a progress value or a number that is equal to the max passed down from PlayQuiz Component.
  const [progress, setProgress] = useState<number>(p.max)

  // On mount, we're watching progress, when progress is less than or equal to 0, fire off onFinished, and clear or cancel the timer so that it doesn't keep running behind the scenes.
  useEffect(() => {
    if (progress <= 0) {
      p.onFinished()
      clearInterval(timer)
    }
  }, [progress])

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <CircularProgress max={p.max} value={progress}>
      <CircularProgressLabel>{progress}</CircularProgressLabel>
    </CircularProgress>
  )
}
