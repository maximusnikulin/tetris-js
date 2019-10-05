import Figure, { Colors } from '../Figure/Figure'
import { Point, Pos } from '../Point'

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
    this.points.forEach((row, indRow) =>
      row.forEach((point, indPoint) => {
        res[`${indPoint},${indRow}`] = point
      })
    )

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

  shrinkRow(numRow: number) {
    const row = this.getRow(numRow)
  }

  getEqualsRows() {
    return this.points.reduce((acc: number[], row, index) => {
      if (row.every(point => point.isFill())) {
        acc.push(index)
      }

      return acc
    }, [])
  }

  isСombinableRows(rowNum: number, combineRowNum: number) {
    let row = this.getRow(rowNum)
    let combineRow = this.getRow(combineRowNum)

    return !row.every((point, index) => {
      return point.isFill() && combineRow[index].isFill()
    })
  }

  addEmptyRow() {
    this.points.unshift(this.points[0].map(() => new Point(false)))
  }

  combineRow(rowNum, combineRowNum) {
    let row = this.getRow(rowNum)
    let combineRow = this.getRow(combineRowNum)

    const newRow = row.map((point, index) => {
      if (point.isFill()) {
        return combineRow[index]
      }
      return point
    })

    this.points.splice(rowNum, 2, newRow)
    this.addEmptyRow()
  }

  collapse(numRow: number) {
    const equalRows = this.getEqualsRows()
    equalRows.forEach(() => {
      this.points.splice(numRow, 1)
      this.addEmptyRow()
    })
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
    return !Object.keys(points).some(key => {
      const [x, y] = key.split(',')
      let match = null
      try {
        match = this.points[y][x]
      } catch {
        throw new Error('Coordinate is not exists')
      }

      return match.fill
    })
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

      if (match.fill) {
        throw new Error('Point filled')
      }

      this.points[y][x] = points[key]
    })
  }
}

export default PointsStack
