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
    this.layout = new Layout(40, 20)
    this.renderer = new RendererCanvas()
    this.figureStack = []
    this.renderer.renderGrid()
  }

  createFigure() {
    return FigureMaker.create(FigureType.first)
  }

  posFigure(figure: Figure) {
    const initPos = [0, 2]
    if (this.layout.canPosFigure(figure, initPos)) {
      this.layout.addFigure(figure, initPos)
    }
  }

  runStep() {
    let figure = this.createFigure()
    this.figureStack.push(figure)
    this.posFigure(figure)
  }
}
