import RendererCanvas from './RendererCanvas'
import Layout from './Layout/Layout'
import FigureMaker from './FigureMaker'
import Figure, { FigureType } from './Figure/Figure'

interface ITetris {}

export class Tetris implements ITetris {
  renderer: RendererCanvas
  layout: Layout
  figureStack: Figure[]
  constructor() {
    this.layout = new Layout(20, 10)
    const { columns, rows } = this.layout.getSize()
    this.renderer = new RendererCanvas(columns, rows)
    this.figureStack = []
    this.renderer.renderGrid()
  }

  createFigure() {
    return FigureMaker.create(FigureType.first)
  }

  changePosFigure(figure: Figure, pos: number[]) {
    if (this.layout.canPosFigure(figure, pos)) {
      figure.setPosition(pos)
      return true
    }
    return false
  }

  runStep() {
    let figure = this.figureStack[this.figureStack.length - 1]
    let figurePos = null
    if (figure) {
      const [x, y] = figure.getPosition()
      figurePos = [x, y + 1]
    } else {
      figure = this.createFigure()
      this.figureStack.push(figure)
      figurePos = [2, 0]
    }

    if (this.changePosFigure(figure, figurePos)) {
      this.renderer.renderFigure(figure)
      return true
    } else {
      // this.layout.addFigure(figure)
      // this.figureStack.pop()
      // this.renderer.renderLayout(this.layout)
      return false
    }
  }
}
