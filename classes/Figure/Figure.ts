import { Point } from '../Point'
import { FigurePatterns, FigureTypes } from './FigureTypes'

export enum Colors {
  green = 'green',
  blue = 'blue',
  aqua = 'aqua',
  violet = 'violet',
  yellow = 'yellow',
  transparent = 'transparent',
}

export interface FigureState {
  patterns: number[][][]
  // setNextPattern: () => void
  // getPattern: () => number[][]
  activePattern: number
}

class Figure {
  position: [number, number]
  color: Colors
  type: FigureTypes = 'I'
  activePattern: number = 0

  constructor(
    type: FigureTypes,
    pos: [number, number],
    color: Colors,
    activePattern: number = 0
  ) {
    this.type = type
    this.activePattern = activePattern
    this.position = pos
    this.color = color
  }

  private getPatterns() {
    return FigurePatterns[this.type]
  }

  getPattern() {
    return this.getPatterns()[this.activePattern]
  }

  setNextPattern() {
    this.activePattern =
      this.activePattern === this.getPatterns().length - 1
        ? 0
        : this.activePattern++
  }

  setPosition(pos: [number, number]) {
    this.position = pos
  }

  getSize() {
    return {
      height: this.getPattern().length,
      width: this.getPattern()[0].length,
    }
  }

  getMapPoints() {
    let coordPoint: { [key: string]: Point } = {}
    let pattern = this.getPattern()
    pattern.forEach((ptrnRow, y) => {
      ptrnRow.forEach((value, x) => {
        if (!value) {
          return
        }

        coordPoint[`${x + this.position[0]},${y + this.position[1]}`] =
          new Point(!!value, value ? this.color : Colors.transparent)
      })
    })

    return coordPoint
  }

  isFillPoint(pos: number[]) {
    const [x, y] = pos
    return !!this.getPattern()[y][x]
  }

  getPosition() {
    return this.position
  }

  getColor() {
    return this.color
  }
}

export default Figure
