import Figure, { Colors } from '../Figure/Figure'
import { Point } from '../Point'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class PointsStack {
  private points: Point[][]
  private columns: number
  private rows: number
  constructor(columns: number, rows: number, defaultValue: 1 | 0 = 0) {
    this.rows = rows
    this.columns = columns
    this.points = [[]]
    this.create(defaultValue)
  }

  private create(defaultValue) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.points[i]) {
          this.points[i] = []
        }
        this.points[i][j] = new Point(j, i, defaultValue)
      }
    }
  }

  getFlatPoints() {
    let points: Point[] = []
    this.points.forEach(row => {
      row.forEach(point => points.push(point))
    })
    return points
  }

  getPoint(pos: number[]): Point {
    const [x, y] = pos
    return this.points[y][x]
  }

  addPoints(points: Point[]) {}

  getAreaPointsMeasure = (points: Point[][]) => {
    const [x, y] = points[0][0].getPosition()
    return {
      height: points.length,
      width: points[0].length,
      x,
      y,
    }
  }

  getSize() {
    return {
      columns: this.columns,
      rows: this.rows,
    }
  }

  resetRow(row: number) {}

  shrink(row: number) {}

  canChangePosPoints(points: Point[][], diff: { dY?: number; dX?: number }) {
    const { height, width, x, y } = this.getAreaPointsMeasure(points)
    let { dX = 0, dY = 0 } = diff
    if (
      y + height + dY > this.rows ||
      x + width + dX > this.columns ||
      x + dX < 0
    ) {
      return false
    }

    let res = true

    out: for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (
          this.getPoint([j + dX, i + dY]).value + points[i][j].getValue() >
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

export default PointsStack
