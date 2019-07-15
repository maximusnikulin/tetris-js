import Figure, { Colors } from './Figure'
import { Point } from './Point'

// Responsibilities
// 1. Grid of points

export interface ILayout {}

class Layout {
  grid: Point[]
  columns: number
  rows: number
  constructor(rows: number, columns: number) {
    this.rows = rows
    this.columns = columns
    this.grid = []
  }

  create() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.grid[i][j] = new Point(j, i, 0)
      }
    }
  }

  getPoint(pos: number[]): Point {
    const [x, y] = pos
    return this.grid[y][x]
  }

  addFigure(figure, pos) {
    const { height, width } = figure.getSize()
    const pattern = figure.getPattern()
    const [x, y] = pos

    for (let i = 0; i <= height; i++) {
      for (let j = 0; j <= width; j++) {
        this.grid[j][i] = new Point(i, j, pattern[y][x])
      }
    }
  }

  canPosFigure(figure: Figure, pos: number[]) {
    const { height, width } = figure.getSize()
    const pattern = figure.getPattern()
    const [x, y] = pos

    let res = true
    out: for (let i = 0; i <= height; i++) {
      for (let j = 0; j <= width; j++) {
        if (
          this.getPoint([j + x, i + y]).value + figure.getPatternValue([j, i]) >
          1
        ) {
          res = false
          break out
        }
      }
    }
    return res
  }
}

export default Layout
