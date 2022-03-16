import Figure from '../Figure/Figure'
import { Point, Pos } from '../Point'

export const sum = (a: number, b: number) => a + b

export interface ILayout {}

class HeapFigures {
  private points: Point[][]
  private columns: number
  private rows: number

  constructor(columns: number, rows: number) {
    this.points = []
    this.columns = columns
    this.rows = rows
    this.create(columns, rows)
  }

  private create(columns: number, rows: number) {
    for (let i = 0; i < rows; i++) {
      if (!this.points[i]) {
        this.points[i] = []
      }
      for (let j = 0; j < columns; j++) {
        this.points[i][j] = new Point(false)
      }
    }
  }

  // private getPointCoordKey(x: number, y: number) {
  //   return `${x},${y}`
  // }

  getFilledRows() {
    return this.points.reduce((acc: number[], row, index) => {
      if (row.every((point) => point.isFill())) {
        acc.push(index)
      }

      return acc
    }, [])
  }

  // removeRow(rowNum: number) {
  //   this.points.splice(rowNum, 1)
  //   this.points.unshift(this.points[0].map(() => new Point(false)))
  // }

  // collapse() {
  //   let equalRows = []
  //   while ((equalRows = this.getEqualsRows()).length) {
  //     equalRows.forEach((rowNum) => this.removeRow(rowNum))
  //   }
  // }

  // getPoint(pos: number[]) {
  //   const [x, y] = pos
  //   const match = this.points[y][x]

  //   if (!this.points[y][x]) {
  //     throw new Error("Can't get point")
  //   }

  //   return match
  // }

  // getSize() {
  //   return {
  //     columns: this.columns,
  //     rows: this.rows,
  //   }
  // }

  // getRow(row: number) {
  //   if (!this.points[row]) {
  //     throw new Error('Row is not exists')
  //   }

  //   return this.points[row]
  // }

  // getPoints() {
  //   return this.points
  // }

  // addPoints(points: { [key: string]: Point }) {
  //   Object.keys(points).forEach((key) => {
  //     const [x, y] = key.split(',').map(Number)
  //     let match: Point

  //     try {
  //       match = this.points[y][x]
  //     } catch {
  //       throw new Error('Coordinate is not exists')
  //     }

  //     if (!match.isFill()) {
  //       this.points[y][x] = points[key]
  //     }
  //   })
  // }
}

export default HeapFigures
