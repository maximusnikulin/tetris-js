import {
  Colors,
  getEmptyLines,
  getRandomColor,
  getRandomPattern,
  getRndValInterval,
} from '../helpers/helpers'
import Figure from './Figure'
import { FigurePatterns, FigureTypes } from './FigureTypes'
import { random, sample, zip, zipWith } from 'lodash'

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
    const { type: pType, index: pIndex } = getRandomPattern()
    const rndColor = getRandomColor()

    const figure = new Figure(pType, [0, 0], rndColor, pIndex)

    const { minY, minX, maxX } = figure.getEdgeInterval()

    let rndX = getRndValInterval(-minX, maxX)
    figure.setPosition([rndX, minY])
    console.log(
      'Figure generated:',
      figure.getPattern(),
      figure.getType(),
      figure.getColor()
    )
    return figure
  }
}

export default FigureFactory
