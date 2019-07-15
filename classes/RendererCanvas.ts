import { Point } from './Point'

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

  render(layout: Point[][]) {}
}

export default RendererCanvas
