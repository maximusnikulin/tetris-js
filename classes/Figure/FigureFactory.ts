import Figure, { Colors } from './Figure'
import { FigureTypes, FigureTypePatterns } from './FigureTypes'
import { getRndValInterval } from '../helpers'
import { createFigureState, getRandomColor } from './helpers'

class FigureFactory {
  static create(
    type: FigureTypes,
    state: number = 1,
    pos: number[],
    color: Colors = Colors.violet
  ) {
    return new Figure(
      createFigureState(FigureTypePatterns[type], 1),
      pos,
      color
    )
  }

  static createRandomFigure(stackSize: { columns: number; rows: number }) {
    const { columns, rows } = stackSize
    const rndTypeIndex = getRndValInterval(
      0,
      Object.keys(FigureTypes).length - 1
    )

    const patterns =
      FigureTypePatterns[
        Object.keys(FigureTypes)[rndTypeIndex] as keyof typeof FigureTypes
      ]

    const activePattern = getRndValInterval(1, patterns.length)

    const state = createFigureState(patterns, activePattern)
    const color = getRandomColor()

    let rndX = getRndValInterval(0, columns - state.getPattern()[0].length)

    return new Figure(state, [rndX, 0], color)
  }
}

export default FigureFactory
