import Figure, { FigureState, Colors } from './Figure/Figure'
import { getRndValInterval } from './helpers'
import figureTypes from './Figure/FigureTypes'
import figurePatterns from './Figure/FigureTypes'

const createFigureState = (
  patterns: number[][][],
  activePattern: number
): FigureState => ({
  patterns,
  activePattern,
  nextPattern() {
    if (this.activePattern === patterns.length) {
      this.activePattern = 0
    } else {
      this.activePattern++
    }
  },
  getPattern() {
    return this.patterns[this.activePattern]
  },
})

const getRandomColor = () => {
  const colorId = getRndValInterval(0, 4)
  const nameColors = Object.keys(Colors) as (keyof typeof Colors)[]
  const colorKey = nameColors[colorId as number]
  return Colors[colorKey]
}

class FigureFactory {
  static createRandomFigure(stackSize: { columns: number; rows: number }) {
    const { columns, rows } = stackSize
    const rndTypeIndex = getRndValInterval(0, figureTypes.length - 1)
    const patterns = figurePatterns[rndTypeIndex]
    const activePattern = getRndValInterval(0, patterns.length - 1)

    const state = createFigureState(patterns, activePattern)
    const color = getRandomColor()

    let rndX = getRndValInterval(0, columns - patterns[activePattern].length)
    return new Figure(state, [rndX, 0], color)
  }
}

export default FigureFactory
