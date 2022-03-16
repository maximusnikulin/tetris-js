import { getRndValInterval } from '../helpers'
import Figure, { Colors } from './Figure'
import { FigurePatterns, FigureTypes } from './FigureTypes'
import { getRandomColor } from './helpers'

class FigureFactory {
  static rows: number
  static columns: number

  static init(columns: number, rows: number) {
    FigureFactory.rows = rows
    FigureFactory.columns = columns
    return FigureFactory
  }

  static create(
    type: FigureTypes,
    pos: [number, number],
    color: Colors = Colors.violet,
    activePattern: number = 0
  ) {
    return new Figure(type, pos, color, activePattern)
  }

  static createRandomFigure() {
    const { columns, rows } = FigureFactory
    const rndTypeIndex = getRndValInterval(
      0,
      Object.keys(FigurePatterns).length - 1
    )
    const rndType = Object.keys(FigurePatterns)[rndTypeIndex] as FigureTypes
    const patterns = FigurePatterns[rndType]
    const rndPatternIndex = getRndValInterval(0, patterns.length)
    const rndPattern = patterns[rndPatternIndex]
    const rndColor = getRandomColor()
    let rndX = getRndValInterval(0, this.columns - rndPattern.length)
    return new Figure(rndType, [rndX, 0], rndColor, rndPatternIndex)
  }
}

export default FigureFactory
