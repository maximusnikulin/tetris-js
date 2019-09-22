import { Point } from '../Point'

export enum FigureType {
  'first' = 1,
  'second',
  'third',
  'forth',
}

export enum Colors {
  green = 'green',
  blue = 'blue',
  black = 'black',
  violet = 'violet',
  transparent = 'transparent',
  yellow = 'yellow',
}

export interface IFigure {}

class Figure implements IFigure {
  // Standart size of figure 4 x 2
  pattern: (0 | 1)[][]
  position: number[]
  color: Colors
  constructor(
    pattern: (0 | 1)[][],
    position: number[] = [0, 0],
    color?: Colors
  ) {
    this.pattern = pattern
    this.position = position
    this.color = color || Colors.violet
  }

  setPosition(pos: number[]) {
    this.position = pos
  }

  getSize() {
    return {
      height: this.pattern.length,
      width: this.pattern[0].length,
    }
  }

  getFigurePoints() {
    let coordPoint = {}
    this.pattern.forEach((ptrnRow, y) => {
      ptrnRow.forEach((value, x) => {
        coordPoint[
          `${x + this.position[0]},${y + this.position[1]}`
        ] = new Point(!!value, value ? this.color : Colors.transparent)
      })
    })

    return coordPoint
  }

  isFillPoint(pos: number[]) {
    const [x, y] = pos
    return !!this.pattern[y][x]
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
