import Figure, { FigureType, Colors } from './Figure/Figure'

export const firstPattern = [[0, 1, 1, 0], [1, 1, 1, 1]]
export const secondPattern = [[1, 1, 1, 1], [0, 0, 0, 1]]
export const thirdPattern = [[1, 1, 1, 1], [1, 0, 0, 0]]
export const forthPattern = [[1, 1, 1, 1]]

class FigureMaker {
  static create(type: FigureType, pos?: number[]) {
    let pattern = []
    let color = Colors.violet

    if (type === FigureType.first) {
      pattern = firstPattern
      color = Colors.violet
    }

    if (type === FigureType.second) {
      pattern = secondPattern
      color = Colors.green
    }

    if (type === FigureType.third) {
      pattern = thirdPattern
      color = Colors.blue
    }

    if (type === FigureType.forth) {
      pattern = forthPattern
      color = Colors.yellow
    }

    return new Figure(pattern, pos, color)
  }
}

export default FigureMaker
