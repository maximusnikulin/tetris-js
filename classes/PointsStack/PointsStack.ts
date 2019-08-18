import Figure, { Colors } from '../Figure/Figure'
import { Point, Pos } from '../Point'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class PointsStack {
  // TODO: Make private it
  public points: { [key: string]: Point }
  private columns: number
  private rows: number
  constructor(columns: number, rows: number, pattern?: (0 | 1)[][]) {
    this.rows = rows
    this.columns = columns
    this.points = {}
    this.create(pattern)
  }

  private create(pattern?: (0 | 1)[][]) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let val = pattern ? pattern[i][j] : 0
        this.points[`${j},${i}`] = new Point(val)
      }
    }
  }

  getPoint(pos: number[]) {
    const key = pos.join(',')
    if (!(key in this.points)) {
      throw new Error('Cant add point')
    }

    return this.points[key]
  }

  getSize() {
    return {
      columns: this.columns,
      rows: this.rows,
    }
  }

  getRow(row: number) {
    let keys = Object.keys(this.points).filter(key => {
      let [x, y] = key.split(',').map(Number)
      return y === row
    })

    return keys.reduce((acc, next) => {
      acc[next] = this.points[next]
      return acc
    }, {})
  }

  addPoints(points: { [key: string]: Point }) {
    for (let key in Object.keys(points)) {
      if (!(key in this.points)) {
        throw new Error('Coordinate is not exists')
      }

      this.points[key] = points[key]
    }
  }
}

export default PointsStack
