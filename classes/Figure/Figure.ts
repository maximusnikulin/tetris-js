import { Point } from '../Point'
import { FigurePatterns, FigureTypes } from './FigureTypes'

export enum Colors {
  green = 'rgb(131, 235, 122)',
  pink = 'rgb(233, 118, 172)',
  aqua = 'rgb(118, 229, 233)',
  violet = 'rgb(91, 89, 231)',
  yellow = 'rgb(231, 233, 118)',
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

  getPoints() {
    let pattern = this.getPattern()
    return pattern.reduce((acc, nextRow) => {
      return acc.concat(
        nextRow.map((value) => {
          const [pX, pY] = this.position
          return new Point(!!value, { x: pX, y: pY }, this.color)
        })
      )
    }, [] as Point[])
  }

  // getMapPoints() {
  //   let coordPoint: { [key: string]: Point } = {}
  //   let pattern = this.getPattern()
  //   pattern.forEach((ptrnRow, y) => {
  //     ptrnRow.forEach((value, x) => {
  //       if (!value) {
  //         return
  //       }

  //       const [pX, pY] = this.position
  //       coordPoint[`${x + pX},${y + pY}`] = new Point(!!value, this.color)
  //     })
  //   })

  //   return coordPoint
  // }

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
