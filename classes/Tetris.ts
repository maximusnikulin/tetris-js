import RendererCanvas from './RendererCanvas'
import FigureMaker from './FigureMaker'
import Figure, { FigureType } from './Figure/Figure'
import PointsStack from './PointsStack/PointsStack'
import { Point } from './Point'

interface ITetris {}

export class Tetris implements ITetris {
  renderer: RendererCanvas
  pointsStack: PointsStack
  figureStack: Figure[]
  square: number
  width: number
  height: number
  isFull: boolean
  interval: NodeJS.Timeout
  constructor() {
    this.pointsStack = new PointsStack(10, 20)
    const { columns, rows } = this.pointsStack.getSize()
    this.renderer = new RendererCanvas(columns * 20, rows * 20)
    this.figureStack = []
    this.renderer.renderGrid()
  }

  createFigure() {
    return FigureMaker.create(FigureType.first)
  }
}
