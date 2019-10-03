import RendererCanvas from './RendererCanvas'
import FigureMaker from './FigureMaker'
import Figure, { FigureType } from './Figure/Figure'
import PointsStack from './PointsStack/PointsStack'
import { Point } from './Point'
import ChangeHorizontalStrategy from './Startegies/ChangeHorizontal'
import ChangeVerticallStrategy from './Startegies/ChangeVertical'

interface ITetris {}

export class Tetris implements ITetris {
  renderer: RendererCanvas
  pointsStack: PointsStack
  figureStack: Figure[]
  figure: Figure
  square: number
  width: number
  height: number
  isFull: boolean
  //NodeJS.Timeout
  interval: any
  vertical: ChangeVerticallStrategy
  constructor() {
    this.pointsStack = new PointsStack(10, 20)
    const { columns, rows } = this.pointsStack.getSize()
    this.renderer = new RendererCanvas(columns * 20, rows * 20)
    this.figureStack = []
    this.figure = null
    this.renderer.renderGrid()

    this.vertical = new ChangeVerticallStrategy(this.pointsStack)
    this.run()
  }

  createFigure() {
    return FigureMaker.create(FigureType.first)
  }

  generateFigure() {
    if (!this.figure) {
      this.figure = this.createFigure()
    }
  }

  getPointsSnap() {
    const figurePoints = this.figure.getFigurePoints()
    const pointsStack = this.pointsStack.getPoints()
    return {
      ...pointsStack,
      ...figurePoints,
    }
  }

  render() {
    const points = this.getPointsSnap()
    this.renderer.renderPoints(points)
  }

  run() {
    this.generateFigure()
    this.render()

    setTimeout(() => {
      if (this.vertical.canShrinkDown(this.figure)) {
        this.vertical.shrinkDown(this.figure)
      }

      this.render()
    }, 2000)
  }
}
