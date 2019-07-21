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

  getPoints() {
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

  addFigure(figure: Figure) {
    const { height, width } = figure.getSize()
    const [x, y] = figure.getPosition()

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const patternValue = figure.getPatternValue([j, i])
        const point = this.points[y + i][x + j]
        point.setValue(patternValue)
        point.setColor(figure.getColor())
      }
    }
  }

  getSize() {
    return {
      columns: this.columns,
      rows: this.rows,
    }
  }

  removeRow(row: number) {
    this.points[row].forEach(point => {
      point.setValue(0)
    })
  }

  shrink(row: number) {
    while (row > 0) {
      debugger
      this.points[row].forEach(point => {
        const [x, y] = point.getPosition()
        point.setPosition([x, y + 1])
      })

      row--
    }
  }

  getEqualsRows(): number[] | null {
    const points = this.getPoints()
    let equals = []
    for (let i = 0; i < this.rows; i++) {
      let pointsRow = points.filter(point => {
        const [x, y] = point.getPosition()
        return y === i
      })

      const sumValues = pointsRow.reduce((acc, next) => {
        return (acc += next.getValue())
      }, 0)

      if (sumValues === this.columns) {
        equals.push(i)
      }
    }

    return equals.length ? equals : null
  }

  canChangePosFigure(figure: Figure, pos: number[]) {
    const { height, width } = figure.getSize()
    const [x, y] = pos

    if (y + height > this.rows || x + width > this.columns || x < 0) {
      return false
    }

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

export default PointsStack
