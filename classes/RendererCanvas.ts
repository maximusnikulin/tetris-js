import { Point } from './Point'
import Layout from './Layout/Layout'
import Figure, { Colors } from './Figure/Figure'

class RendererCanvas {
  ctx: CanvasRenderingContext2D
  node: HTMLCanvasElement
  width: number
  square: number
  height: number
  columns: number
  rows: number
  constructor(columns, rows, square = 20) {
    this.node = <HTMLCanvasElement>document.getElementById('tetris-js')
    this.ctx = this.node.getContext('2d')
    this.columns = columns
    this.rows = rows
    this.width = columns * square + 1
    this.height = rows * square + 1
    this.node.width = this.width
    this.node.height = this.height
    this.square = square
  }

  renderGrid() {
    this.ctx.lineWidth = 1
    const columns = this.width / this.square + 1
    const rows = this.height / this.square + 1
    for (let i = 0; i <= columns; i++) {
      this.ctx.moveTo(i * this.square + 0.5, 0)
      this.ctx.lineTo(i * this.square + 0.5, this.height)
      this.ctx.stroke()
    }

    for (let j = 0; j <= rows; j++) {
      this.ctx.moveTo(0, j * this.square + 0.5)
      this.ctx.lineTo(this.width, j * this.square + 0.5)
      this.ctx.stroke()
    }
  }

  renderFigure(figure: Figure) {
    const points = figure.getPoints()
    const startXY = figure.getPosition()
    const size = figure.getSize()
    this.renderPoints(points, startXY, size)
  }

  renderLayout(layout: Layout) {
    const points = layout.getPoints()
    const size = layout.getSize()
    this.renderPoints(points, [0, 0], size)
  }

  renderPoints(
    points: Point[][],
    startXY: number[],
    size: { width: number; height: number }
  ) {
    let [startX, startY] = startXY
    const { width, height } = size

    // this.ctx.clearRect(
    //   startX * this.square + 0.5,
    //   (startY - 1) * this.square + 0.5,
    //   width * this.square + 0.5,
    //   height * this.square + 0.5
    // )

    this.ctx.clearRect(0, 0, this.width, this.height)

    this.renderGrid()
    this.ctx.beginPath()
    for (let i = 0; i < height; i++) {
      this.ctx.fillStyle = Colors.transparent
      for (let j = 0; j < width; j++) {
        const point = points[i][j]
        if (point.value === 1) {
          this.ctx.fillStyle = point.color
          this.ctx.rect(
            //TODO: Create util for thar
            (startX + j) * this.square + 0.5,
            (startY + i) * this.square + 0.5,
            this.square,
            this.square
          )
          this.ctx.fill()
          this.ctx.strokeStyle = Colors.black
          this.ctx.stroke()
        }
      }
    }
    this.ctx.closePath()
  }
}

export default RendererCanvas
