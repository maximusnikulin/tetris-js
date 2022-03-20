import { Colors } from '../constants'
import HeapPoints from '../HeapPoints/HeapPoints'
import {
  getRandomColor,
  getRandomPattern,
  getRndValInterval,
} from '../helpers/common'
import HeapFigureBehaviorFacade from '../HeapFigureBehavior/HeapFigureBehaviorFacade'
import Figure from './Figure'
import { FigureTypes } from './FigureTypes'

class FigureFactory {
  private static rows: number
  private static columns: number

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

  static createRandomFigure(heap: HeapPoints) {
    const { type: pType, index: pIndex } = getRandomPattern()
    const rndColor = getRandomColor()

    const figure = new Figure(pType, [0, 0], rndColor, pIndex)
    const positioner = new HeapFigureBehaviorFacade(heap, figure)
    const { minY, minX, maxX } = positioner.getFigureAreaParams()

    let rndX = getRndValInterval(minX, maxX)

    figure.setPosition([rndX, minY])
    return figure
  }
}

export default FigureFactory
