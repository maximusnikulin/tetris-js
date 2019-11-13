import { Point } from '../Point'
import PointsStack from '../PointsStack/PointsStack'

export enum FigureType {
  'first' = 1,
  'second',
  'third',
  'forth',
  'five',
}

export enum Colors {
  green = 'green',
  blue = 'blue',
  aqua = 'aqua',
  violet = 'violet',
  yellow = 'yellow',
  transparent = 'transparent',
}

export interface IFigure {}

class Figure implements IFigure {
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

  getMapPoints() {
    let coordPoint: { [key: string]: Point } = {}

    this.pattern.forEach((ptrnRow, y) => {
      ptrnRow.forEach((value, x) => {
        if (!value) {
          return
        }

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
