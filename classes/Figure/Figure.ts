import { Colors } from '../constants'
import {
  createPointsByPattern,
  getSnapPoints,
  matrixToMap,
  toConsole,
} from '../helpers/common'
import { Point } from '../Point'
import { FigurePatterns, FigureTypes } from './FigureTypes'

class Figure {
  private position: number[]
  private color: Colors
  private type: FigureTypes = 'I'
  private activePattern: number = 0

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

  getPatternIndex() {
    return this.activePattern
  }

  getType() {
    return this.type
  }

  getPatterns() {
    return FigurePatterns[this.type]
  }

  getPattern() {
    return this.getPatterns()[this.activePattern]
  }

  private getNextPatternIndex() {
    return (this.activePattern =
      this.activePattern === this.getPatterns().length - 1
        ? 0
        : this.activePattern + 1)
  }

  private getPrevPatternIndex() {
    return (this.activePattern =
      this.activePattern === 0
        ? this.getPatterns().length - 1
        : this.activePattern - 1)
  }

  setPrevPattern() {
    this.activePattern = this.getPrevPatternIndex()
  }

  setPattern(pIndex: number) {
    this.activePattern = pIndex
  }

  setNextPattern() {
    this.activePattern = this.getNextPatternIndex()
  }

  setPosition(pos: number[]) {
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
    return createPointsByPattern(pattern, this.color)
  }

  getPointsMap() {
    let pattern = this.getPattern()
    let [pX, pY] = this.position
    return matrixToMap(
      pattern,
      (el) => new Point(!!el, this.color, Colors.transparent),
      (x, y) => `${pX + x},${pY + y}`,
      (el) => el > 0
    )
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

  toStirng() {
    return toConsole(getSnapPoints(this.getPoints()))
  }
}

export default Figure
