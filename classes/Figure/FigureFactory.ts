import Figure, { Colors } from './Figure'
import { FigurePatterns, FigureTypes } from './FigureTypes'

class FigureFactory {
  static create(
    type: FigureTypes,
    pos: [number, number],
    color: Colors = Colors.violet,
    activePattern: number = 0
  ) {
    return new Figure(type, pos, color, activePattern)
  }

  // static createRandomFigure(stackSize: { columns: number; rows: number }) {
  //   const { columns, rows } = stackSize
  //   const rndTypeIndex = getRndValInterval(
  //     0,
  //     Object.keys(FigureTypes).length - 1
  //   )
  //   const patterns =
  //     FigureTypePatterns[
  //       Object.keys(FigureTypes)[rndTypeIndex] as keyof typeof FigureTypes
  //     ]
  //   const activePattern = getRndValInterval(1, patterns.length)
  //   const state = createFigureState(patterns, activePattern)
  //   const color = getRandomColor()
  //   let rndX = getRndValInterval(0, columns - state.getPattern()[0].length)
  //   return new Figure(state, [rndX, 0], color)
  // }
}

export default FigureFactory
