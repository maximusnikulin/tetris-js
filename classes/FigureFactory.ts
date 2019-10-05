import Figure, { FigureType, Colors } from './Figure/Figure'
import { getRndValInterval } from './helpers'

export const firstPattern = [[0, 1, 1, 0], [1, 1, 1, 1]]
export const secondPattern = [[1, 1, 1, 1], [0, 0, 0, 1]]
export const thirdPattern = [[1, 1, 1, 1], [1, 0, 0, 0]]
export const forthPattern = [[1, 1, 1, 1]]
export const fivePattern = [[1, 1, 0], [0, 1, 1]]

class FigureFactory {
  static create(
    type: FigureType,
    pos?: number[],
    color: Colors = Colors.violet
  ) {
    let pattern = []

    if (type === FigureType.first) {
      pattern = firstPattern
    }

    if (type === FigureType.five) {
      pattern = fivePattern
    }

    if (type === FigureType.second) {
      pattern = secondPattern
    }

    if (type === FigureType.third) {
      pattern = thirdPattern
    }

    if (type === FigureType.forth) {
      pattern = forthPattern
    }

    const colorId = getRndValInterval(0, 4)
    color = Colors[Object.keys(Colors)[colorId]]
    return new Figure(pattern, pos, color)
  }
}

export default FigureFactory
