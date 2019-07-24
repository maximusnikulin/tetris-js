import Figure, { FigureType, Colors, PosXY } from './Figure/Figure'

class FigureMaker {
  static create(type: FigureType, pos?: PosXY) {
    let pattern = []
    let color = Colors.black
    // Will be random value
    // Should be in empty space

    if (type === FigureType.first) {
      pattern[0] = [0, 1, 1, 0]
      pattern[1] = [1, 1, 1, 1]
      color = Colors.violet
    }

    if (type === FigureType.second) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [0, 0, 0, 1]
      color = Colors.green
    }

    if (type === FigureType.third) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [1, 0, 0, 0]
      color = Colors.blue
    }

    if (type === FigureType.forth) {
      pattern[0] = [1, 1, 1, 1]
      color = Colors.yellow
    }

    if (type === FigureType.five) {
      pattern[0] = [1, 1, 1, 1, 1, 1]
      color = Colors.yellow
    }

    return new Figure(pattern, pos, color)
  }
}

export default FigureMaker
