import { Point } from './Point'
import { Colors } from './Figure/Figure'

class RendererCanvas {
  ctx: CanvasRenderingContext2D
  node: HTMLCanvasElement
  width: number
  square: number
  height: number
  columns: number
  rows: number

  constructor(inWidth: number, inHeight: number, square = 20) {
    const width = inWidth * square
    const height = inHeight * square
    this.node = <HTMLCanvasElement>document.getElementById('tetris-js')
    this.ctx = this.node.getContext('2d') as CanvasRenderingContext2D
    this.columns = width / square + 1
    this.rows = height / square + 1
    this.width = width + 1
    this.height = height + 1
    this.node.width = this.width
    this.node.height = this.height
    this.square = square
  }

  renderGrid() {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'red'
    for (let i = 0; i <= this.columns; i++) {
      this.ctx.moveTo(i * this.square + 0.5, 0)
      this.ctx.lineTo(i * this.square + 0.5, this.height)
      this.ctx.stroke()
    }

    for (let j = 0; j <= this.rows; j++) {
      this.ctx.moveTo(0, j * this.square + 0.5)
      this.ctx.lineTo(this.width, j * this.square + 0.5)
      this.ctx.stroke()
    }
  }

  renderPoints(points: { [key: string]: Point }) {
    const width = this.width
    const height = this.height

    this.ctx.clearRect(0, 0, width, height)

    this.ctx.beginPath()
    this.renderGrid()

    Object.keys(points).forEach((key) => {
      const point = points[key]
      const [x, y] = key.split(',').map(Number)

      this.ctx.fillStyle = Colors.transparent
      if (point.isFill()) {
        this.ctx.fillStyle = point.getColor()
        this.ctx.fillRect(
          x * this.square + 0.5,
          y * this.square + 0.5,
          this.square,
          this.square
        )
        this.ctx.stroke()
      }

      this.ctx.closePath()
    })
  }
}

export default RendererCanvas
