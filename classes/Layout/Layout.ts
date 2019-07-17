import Figure, { Colors } from '../Figure/Figure'
import { Point } from '../Point'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class Layout {
  private grid: Point[][]
  private columns: number
  private rows: number
  constructor(rows: number, columns: number, defaultValue: 1 | 0 = 0) {
    this.rows = rows
    this.columns = columns
    this.grid = [[]]
    this.create(defaultValue)
  }

  private create(defaultValue) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.grid[i]) {
          this.grid[i] = []
        }
        this.grid[i][j] = new Point(j, i, defaultValue)
      }
    }
  }

  getGrid() {
    return this.grid
  }

  getPoint(pos: number[]): Point {
    const [x, y] = pos
    return this.grid[y][x]
  }

  addFigure(figure, pos) {
    const { height, width } = figure.getSize()
    const [x, y] = pos

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const patternValue = figure.getPatternValue([j, i])
        const point = this.grid[y + i][x + j]
        point.setValue(patternValue)
        point.setColor(figure.getColor())
      }
    }
  }

  getSize() {
    return {
      width: this.grid[0].length,
      height: this.grid.length,
    }
  }

  canPosFigure(figure: Figure, pos: number[]) {
    const { height, width } = figure.getSize()
    const pattern = figure.getPattern()
    const [x, y] = pos

    let res = true
    out: for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
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
