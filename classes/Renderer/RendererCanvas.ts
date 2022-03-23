import { Colors, LayoutParams } from '../constants'
import { Point } from '../Point'
import { IRenderer } from './RendererType'

class RendererCanvas implements IRenderer {
  ctx: CanvasRenderingContext2D
  node: HTMLCanvasElement
  widthArea: number
  square: number
  heightArea: number
  columns: number
  rows: number
  widthStat: number

  getTextStyle(size: number) {
    return `${size}px 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`
  }
  renderNextFigure(points: Record<string, Point>) {
    const sX = this.widthArea + 20
    const sY = this.node.height - 300

    this.ctx.font = this.getTextStyle(24)
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Next figure', 330, 50)

    this.renderPoints(points, [330, 80, 400, 300])
  }

  renderDigits(level: number, points: number) {
    this.ctx.font = this.getTextStyle(24)
    this.ctx.fillStyle = 'white'
    this.ctx.fillText('Level', 330, 200)
    this.ctx.font = this.getTextStyle(18)
    this.ctx.fillText(level.toString(), 330, 230)
    this.ctx.font = this.getTextStyle(24)
    this.ctx.fillText('Points', 330, 270)
    this.ctx.font = this.getTextStyle(18)
    this.ctx.fillText(points.toString(), 330, 300)
  }

  renderStatistic(
    level: number,
    points: number,
    nextFigure: Record<string, Point>
  ): void {
    this.renderNextFigure(nextFigure)
    this.renderDigits(level, points)
  }

  constructor(params: LayoutParams) {
    const { rows, square, columns } = params
    const width = columns * square
    const height = rows * square
    this.node = <HTMLCanvasElement>document.getElementById('tetris-js')
    this.ctx = this.node.getContext('2d') as CanvasRenderingContext2D
    this.columns = width / square + 1
    this.rows = height / square + 1
    this.widthArea = width + 1
    this.heightArea = height + 1
    this.widthStat = 200
    this.node.width = this.widthArea + this.widthStat
    this.node.height = this.heightArea
    this.square = square

    this.renderGrid()
  }

  renderGrid() {
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = Colors.grid
    for (let i = 0; i < this.columns; i++) {
      this.ctx.moveTo(i * this.square + 0.5, 0)
      this.ctx.lineTo(i * this.square + 0.5, this.heightArea)
      this.ctx.stroke()
    }

    for (let j = 0; j < this.rows; j++) {
      this.ctx.moveTo(0, j * this.square + 0.5)
      this.ctx.lineTo(this.widthArea, j * this.square + 0.5)
      this.ctx.stroke()
    }
  }

  renderArea(points: Record<string, Point>) {
    this.renderPoints(points, [0, 0, this.widthArea, this.heightArea])
  }

  renderPoints(
    points: Record<string, Point>,
    rect: [number, number, number, number]
  ) {
    this.ctx.clearRect(...rect)

    this.renderGrid()
    this.ctx.beginPath()

    Object.keys(points).forEach((key) => {
      const [x, y] = key.split(',').map(Number)
      const point = points[key]
      this.ctx.fillStyle = Colors.transparent
      if (point.isFill()) {
        this.ctx.fillStyle = point.getColor()
        this.ctx.fillRect(
          rect[0] + x * this.square + 0.5,
          rect[1] + y * this.square + 0.5,
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
