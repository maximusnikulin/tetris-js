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
  constructor(pattern: (0 | 1)[][], position: number[] = null, color?: Colors) {
    this.pattern = pattern
    this.position = position
    this.color = color || Colors.black
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

  getPatternValue(pos: number[]) {
    const [x, y] = pos
    return this.pattern[y][x]
  }

  getPoints() {
    const [dX, dY] = this.position

    let points: Point[] = []
    this.pattern.forEach((ptrnRow, y) => {
      return ptrnRow.forEach((value, x) =>
        points.push(
          new Point(
            x + dX,
            y + dY,
            value,
            value ? this.color : Colors.transparent
          )
        )
      )
    })
    return points
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
