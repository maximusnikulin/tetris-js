import HeapFigures from '../HeapFigures/HeapFigures'
import {
  Colors,
  getRandomColor,
  getRandomPattern,
  getRndValInterval,
} from '../helpers/helpers'
import PositionerFacade from '../Positioner/PositionerFacade'
import Figure from './Figure'
import { FigureTypes } from './FigureTypes'

class FigureFactory {
  private static rows: number
  private static columns: number

  static init(columns: number, rows: number) {
    FigureFactory.rows = rows
    FigureFactory.columns = columns
    return FigureFactory
  }

  static getSize() {
    return {
      rows: FigureFactory.rows,
      columns: FigureFactory.columns,
    }
  }

  static create(
    type: FigureTypes,
    pos: [number, number],
    color: Colors = Colors.violet,
    activePattern: number = 0
  ) {
    return new Figure(type, pos, color, activePattern)
  }

  static createRandomFigure(heap: HeapFigures) {
    const { type: pType, index: pIndex } = getRandomPattern()
    const rndColor = getRandomColor()

    const figure = new Figure(pType, [0, 0], rndColor, pIndex)
    const positioner = new PositionerFacade(heap, figure)
    const { minY, minX, maxX } = positioner.getFigureAreaParams()

    let rndX = getRndValInterval(minX, maxX)

    figure.setPosition([rndX, minY])
    console.log(
      'Figure generated ===> \n',
      'pattern:' + figure.getPattern() + '\n',
      'type:' + figure.getType(),
      +'\n',
      'color:' + figure.getColor(),
      +'\n',
      'position:' + figure.getPosition(),
      +'\n'
    )
    return figure
  }
}

export default FigureFactory
