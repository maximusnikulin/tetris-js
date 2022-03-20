import { matrixToMap } from '../helpers/helpers'
import { Point } from '../Point'

export const sum = (a: number, b: number) => a + b

class HeapFigures {
  private points: Point[][] = []

  constructor(columns: number = 10, rows: number = 20) {
    this.create(columns, rows)
  }

  // * Dynamicaly can change size by setted points
  getSize() {
    return {
      rows: this.points.length,
      columns: this.points[0].length,
    }
  }

  setPoints(points: Point[][]) {
    this.points = points
  }

  create(columns: number, rows: number) {
    for (let i = 0; i < rows; i++) {
      if (!this.points[i]) {
        this.points[i] = []
      }

      for (let j = 0; j < columns; j++) {
        this.points[i][j] = new Point(false)
      }
    }
  }

  getFilledRows() {
    return this.points.reduce((acc: number[], row, index) => {
      if (row.every((point) => point.isFill())) {
        acc.push()
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

  getPoint(pos: [number, number]) {
    const points = this.getPointsMap()
    const [x, y] = pos
    return points[`${x},${y}`] ?? new Point(false)
  }

  // getRow(row: number) {
  //   if (!this.points[row]) {
  //     throw new Error('Row is not exists')
  //   }

  //   return this.points[row]
  // }

  getPoints() {
    return this.points
  }

  // TODO: memoize it
  getPointsMap() {
    return matrixToMap(this.points)
  }

  addPoints(points: { [key: string]: Point }) {
    const heapPoints = this.getPointsMap()
    Object.keys(points).forEach((keyPos) => {
      if (keyPos in heapPoints) {
        const addPoint = points[keyPos]
        const heapPoint = heapPoints[keyPos]
        heapPoint.setColor(addPoint.getColor())
        heapPoint.setIsFill(addPoint.isFill())
      }
    })
  }
}

export default HeapFigures
