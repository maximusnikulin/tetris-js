import getEmptyLines from '../helpers/getEmptyLines'
import { matrixToMap } from '../helpers/helpers'
import { letsMemoize } from '../helpers/memoizeDecorator'
import { Point } from '../Point'
import { FigurePatterns, FigureTypes } from './FigureTypes'
import HeapFigures from '../HeapFigures/HeapFigures'
import { Colors } from '../constants'

class Figure {
  private position: [number, number]
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

  setPosition(pos: [number, number]) {
    this.position = pos
  }

  getSize() {
    return {
      height: this.getPattern().length,
      width: this.getPattern()[0].length,
    }
  }

  getPointsMap() {
    let pattern = this.getPattern()
    let [pX, pY] = this.position
    return matrixToMap(
      pattern,
      (el) => new Point(!!el, this.color, Colors.area),
      (x, y) => `${pX + x},${pY + y}`
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
}

export default Figure
