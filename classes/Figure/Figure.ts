import { Point } from '../Point'

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
  black = 'black',
  violet = 'violet',
  transparent = 'transparent',
  yellow = 'yellow',
}

export interface IFigure {}

export interface PosXY {
  x: number
  y: number
}

class Figure implements IFigure {
  // Standart size of figure 4 x 2
  pattern: (0 | 1)[][]
  position: PosXY
  color: Colors
  constructor(
    pattern: (0 | 1)[][],
    position: { x: number; y: number } = { x: 0, y: 0 },
    color?: Colors
  ) {
    this.pattern = pattern
    this.position = position
    this.color = color || Colors.black
  }

  setPosition(pos: Partial<PosXY>) {
    for (let key in pos) {
      this.position[key] = pos[key]
    }
  }

  getPointsArea() {
    const { x: dX, y: dY } = this.position
    return this.pattern.map((ptrnRow, y) =>
      ptrnRow.map(
        (value, x) =>
          new Point(
            x + dX,
            y + dY,
            value,
            value ? this.color : Colors.transparent
          )
      )
    )
  }

  getSize() {
    return {
      height: this.pattern.length,
      width: this.pattern[0].length,
    }
  }

  getFlatPoints() {
    const { x: dX, y: dY } = this.position

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
