import Figure, { Colors } from '../Figure/Figure'
import { Point, Pos } from '../Point'
import { p } from './__test__/mocks'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class PointsStack {
  // TODO: Make private it
  public points: Point[][]
  private columns: number
  private rows: number
  constructor(columns: number, rows: number, points?: Point[][]) {
    this.rows = rows
    this.columns = columns
    this.points = []
    this.create(points)
  }

  getPointsMatrix() {
    return this.points
  }

  getPoints() {
    const res: { [key: string]: Point } = {}

    this.points.forEach((row, index) => {
      const indRow = index
      row.forEach((point, indPoint) => {
        res[`${indPoint},${indRow}`] = point
      })
    })

    return res
  }

  private create(points?: Point[][]) {
    if (points) {
      this.points = points
      return
    }

    for (let i = 0; i < this.rows; i++) {
      if (!this.points[i]) {
        this.points[i] = []
      }
      for (let j = 0; j < this.columns; j++) {
        this.points[i][j] = new Point(false)
      }
    }
  }

  getEqualsRows() {
    return this.points.reduce((acc: number[], row, index) => {
      if (row.every(point => point.isFill())) {
        acc.push(index)
      }

      return acc
    }, [])
  }

  removeRow(rowNum: number) {
    this.points.splice(rowNum, 1)
    this.points.unshift(this.points[0].map(() => new Point(false)))
  }

  collapse() {
    let equalRows = []
    while ((equalRows = this.getEqualsRows()).length) {
      equalRows.forEach(rowNum => this.removeRow(rowNum))
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

  canAddPoints(points: { [key: string]: Point }) {
    return Object.keys(points).every(key => {
      const [x, y] = key.split(',')
      let match = null
      try {
        match = this.points[y][x]
      } catch {
        throw new Error('Coordinate is not exists')
      }

      return !(points[key].isFill() && match.isFill())
    })
  }

  addPoints(points: { [key: string]: Point }) {
    Object.keys(points).forEach(key => {
      const [x, y] = key.split(',')
      let match: Point | null = null
      try {
        match = this.points[y][x]
      } catch {
        throw new Error('Coordinate is not exists')
      }

      if (!match.isFill()) {
        this.points[y][x] = points[key]
      }
    })
  }
}

export default PointsStack
