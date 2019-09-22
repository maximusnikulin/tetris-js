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

  private create(pattern?: (0 | 1)[][]) {
    for (let i = 0; i < this.rows; i++) {
      if (!this.points[i]) {
        this.points[i] = []
      }
      for (let j = 0; j < this.columns; j++) {
        let val = pattern ? pattern[i][j] : 0
        this.points[i][j] = new Point(val)
      }
    }
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
    for (let key in Object.keys(points)) {
      const [x, y] = key.split(',')
      let match = this.points[y][x]

      if (!match) {
        throw new Error('Coordinate is not exists')
      }

      match = points[key]
    }
  }
}

export default PointsStack
