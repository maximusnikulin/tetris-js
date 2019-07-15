export enum FigureType {
  'first' = 1,
  'second',
  'third',
  'forth',
}

export enum Colors {
  'green' = 1,
  'blue',
  'black',
  'violet',
  'transparent',
}

export interface IFigure {}

class Figure implements IFigure {
  // Standart size of figure 4 x 2
  pattern: (0 | 1)[][]
  position: number[]
  color: Colors
  constructor(pattern: (0 | 1)[][], position?: number[], color?: Colors) {
    this.pattern = pattern
    this.position = position
    this.color = color || Colors.black
  }

  getSize() {
    return {
      height: this.pattern.length,
      width: this.pattern[0].length,
    }
  }

  getPatternValue(pos: number[]) {
    const [x, y] = pos
    return this.pattern[y][x]
  }

  getPattern() {
    return this.pattern
  }

  getPosition() {
    return this.position
  }

  getColor() {
    return this.color
  }
}

export default Figure
