import { Point } from './Point'
import Layout from './Layout/Layout'
import { Colors } from './Figure/Figure'

class RendererCanvas {
  ctx: any
  node: HTMLCanvasElement
  constructor() {
    this.node = <HTMLCanvasElement>document.getElementById('tetris-js')
    this.ctx = this.node.getContext('2d')
  }

  renderGrid() {
    let width = 20
    let height = 20
    this.node.width = 201
    this.node.height = 401
    this.ctx.lineWidth = 1

    for (let i = 0; i <= 11; i++) {
      this.ctx.moveTo(i * 20 + 0.5, 0)
      this.ctx.lineTo(i * 20 + 0.5, 400)
      this.ctx.stroke()
    }

    for (let j = 0; j <= 21; j++) {
      this.ctx.moveTo(0, j * 20 + 0.5)
      this.ctx.lineTo(200, j * 20 + 0.5)
      this.ctx.stroke()
    }
  }

  render(layout: Layout) {
    this.ctx.beginPath()
    const { width, height } = layout.getSize()
    for (let i = 0; i < height; i++) {
      this.ctx.fillStyle = Colors.transparent
      for (let j = 0; j < width; j++) {
        const point = layout.getPoint([j, i])
        if (point.value === 1) {
          this.ctx.fillStyle = point.color
          this.ctx.rect(j * 20 + 0.5, i * 20 + 0.5, 20, 20)
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
