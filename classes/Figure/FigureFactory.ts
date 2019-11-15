import Figure, { FigureState, Colors } from './Figure'
import { getRndValInterval } from '../helpers'
import figureTypes from './FigureTypes'
import figurePatterns from './FigureTypes'

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

const getRandomColor = () => {
  const colorId = getRndValInterval(0, 4)
  const nameColors = Object.keys(Colors) as (keyof typeof Colors)[]
  const colorKey = nameColors[colorId as number]
  return Colors[colorKey]
}

class FigureFactory {
  static create(state: FigureState, pos: number[], color: Colors) {
    return new Figure(state, pos, color)
  }

  static createRandomFigure(stackSize: { columns: number; rows: number }) {
    const { columns, rows } = stackSize
    const rndTypeIndex = getRndValInterval(0, figureTypes.length - 1)
    const patterns = figurePatterns[rndTypeIndex]
    const activePattern = getRndValInterval(0, patterns.length - 1)

    const state = createFigureState(patterns, activePattern)
    const color = getRandomColor()

    let rndX = getRndValInterval(0, columns - patterns[activePattern][0].length)

    console.log(rndX)
    return new Figure(state, [rndX, 0], color)
  }
}

export default FigureFactory
