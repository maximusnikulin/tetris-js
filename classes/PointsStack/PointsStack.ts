import Figure, { Colors } from '../Figure/Figure'
import { Point, Pos } from '../Point'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class PointsStack {
  // TODO: Make private it
  public points: Point[][]
  private columns: number
  private rows: number
  constructor(columns: number, rows: number, pattern?: (0 | 1)[][]) {
    this.rows = rows
    this.columns = columns
    this.points = []
    this.create(pattern)
  }

  getPointsMatrix() {
    return this.points
  }

  getPoints() {
    const res: { [key: string]: Point } = {}
    this.points.forEach((row, indRow) =>
      row.forEach((point, indPoint) => {
        res[`${indPoint},${indRow}`] = point
      })
    )

    return res
  }

  private create(pattern?: (0 | 1)[][]) {
    for (let i = 0; i < this.rows; i++) {
      if (!this.points[i]) {
        this.points[i] = []
      }
      for (let j = 0; j < this.columns; j++) {
        let val = pattern ? pattern[i][j] : 0
        this.points[i][j] = new Point(!!val)
      }
    }
  }

  shrink(numRow: number) {
    this.points.splice(numRow, 1)
    this.points.unshift(this.points[0].map(() => new Point(false)))
  }

  getPoint(pos: number[]) {
    const [x, y] = pos
    const match = this.points[y][x]

    if (!this.points[y][x]) {
      throw new Error('Cant add point')
    }

    return match
  }

  getSize() {
    return {
      columns: this.columns,
      rows: this.rows,
    }
  }

  getRow(row: number) {
    if (!this.points[row]) {
      throw new Error('Row is not exists')
    }

    return this.points[row]
  }

  addPoints(points: { [key: string]: Point }) {
    Object.keys(points).forEach(key => {
      const [x, y] = key.split(',')
      let match = null
      try {
        match = this.points[y][x]
      } catch {
        throw new Error('Coordinate is not exists')
      }

      this.points[y][x] = points[key]
    })
  }
}

export default PointsStack
