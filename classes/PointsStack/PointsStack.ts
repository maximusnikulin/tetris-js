import Figure, { Colors } from '../Figure/Figure'
import { Point, Pos } from '../Point'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class PointsStack {
  // TODO: Make private it
  public points: Point[]
  private columns: number
  private rows: number
  constructor(columns: number, rows: number, pattern?: (0 | 1)[][]) {
    this.rows = rows
    this.columns = columns
    this.points = []
    this.create(pattern)
  }

  getPoint = (pos: Pos) => {
    const { x, y } = pos
    const res = this.points.find(point => {
      const { x: pX, y: pY } = point.getPosition()
      return pX === x && pY === y
    })

    if (!res) {
      throw new Error('Point not found')
    }

    return res
  }

  private create(pattern?: (0 | 1)[][]) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let val = pattern ? pattern[i][j] : 0
        this.points.push(new Point(j, i, val))
      }
    }
  }

  getSize() {
    return {
      columns: this.columns,
      rows: this.rows,
    }
  }
}

export default PointsStack
