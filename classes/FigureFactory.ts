import Figure, { FigureType, Colors } from './Figure/Figure'
import { getRndValInterval } from './helpers'

export const firstPattern = [
  [0, 1, 0],
  [1, 1, 1],
]

export const secondPattern = [
  [1, 1, 0],
  [0, 1, 1],
]

export const thirdPattern = [
  [1, 1, 1],
  [0, 0, 1],
]

export const forthPattern = [[1, 1, 1, 1]]

export const fivePattern = [
  [1, 1],
  [1, 1],
]

class FigureFactory {
  static create(
    type: FigureType,
    pos?: number[],
    color: Colors = Colors.violet
  ) {
    let pattern: any = []

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
    const nameColors = Object.keys(Colors) as (keyof typeof Colors)[]

    const colorKey = nameColors[colorId as number]
    color = Colors[colorKey]
    return new Figure(pattern, pos, color)
  }
}

export default FigureFactory
