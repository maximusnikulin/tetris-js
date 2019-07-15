import Figure, { FigureType } from './Figure/Figure'

class FigureMaker {
  static create(type: FigureType, pos?: number[]) {
    let pattern = []
    // Will be random value
    // Should be in empty space

    if (type === FigureType.first) {
      pattern[0] = [0, 1, 1, 0]
      pattern[1] = [1, 1, 1, 1]
    }

    if (type === FigureType.second) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [0, 0, 0, 1]
    }

    if (type === FigureType.third) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [1, 0, 0, 0]
    }

    if (type === FigureType.forth) {
      pattern[0] = [1, 1, 1, 1]
    }

    return new Figure(pattern, pos)
  }
}

export default FigureMaker
