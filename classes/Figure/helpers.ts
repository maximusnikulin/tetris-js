import { getRndValInterval } from '../helpers'
import { Colors, FigureState } from './Figure'

export const createFigureState = (
  patterns: number[][][],
  activePattern: number
): FigureState => ({
  patterns,
  activePattern,
  setNextPattern() {
    if (this.activePattern === patterns.length) {
      this.activePattern = 1
    } else {
      this.activePattern++
    }
  },
  getPattern() {
    return this.patterns[this.activePattern - 1]
  },
})

export const getRandomColor = () => {
  const colorId = getRndValInterval(0, 4)
  const nameColors = Object.keys(Colors) as (keyof typeof Colors)[]
  const colorKey = nameColors[colorId as number]
  return Colors[colorKey]
}
