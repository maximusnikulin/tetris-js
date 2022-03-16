import { zip } from 'lodash'
import { Colors, getEmptyLines, matrixToMap } from '../helpers/helpers'
import { Point } from '../Point'
import FigureFactory from './FigureFactory'
import { FigurePatterns, FigureTypes } from './FigureTypes'

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

  getType() {
    return this.type
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
    return matrixToMap(
      pattern,
      (el) => new Point(!!el, this.color, Colors.lightGrey),
      (x, y) => `${x + this.position[0]},${y + this.position[1]}`
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

  getEdgeInterval() {
    const pattern = this.getPattern()
    const emptyLinesTop = getEmptyLines(pattern)
    const transparentPattern = zip(...pattern) as unknown as number[][]
    const rev = [...transparentPattern].reverse()
    const emptyLinesLeft = getEmptyLines(transparentPattern)
    const emptyLinesRight = getEmptyLines(rev)
    return {
      minY: -emptyLinesTop,
      minX: -emptyLinesLeft,
      maxX: FigureFactory.columns - pattern[0].length + emptyLinesRight,
    }
  }
}

export default Figure
