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
    this.square = 20
    this.width = columns * this.square
    this.height = rows * this.square
    this.renderer = new RendererCanvas(this.width, this.height)
    this.figureStack = []
    this.renderer.renderGrid()
    this.isFull = false
  }

  createFigure() {
    return FigureMaker.create(FigureType.first)
  }

  getStackAndFigurePoints(figure: Figure, pointsStack: PointsStack) {
    const figurePoints = figure.getPoints()
    const [fX, fY] = figure.getPosition()
    const stackPoints = pointsStack.getPoints()

    return stackPoints.map(point => {
      const [x, y] = point.getPosition()
      const matchPoint = figurePoints.find(figPoint => {
        const [fpX, fpY] = figPoint.getPosition()
        return fpX === x && fpY === y
      })

      return matchPoint || point
    })
  }

  endGame() {
    alert('END GAME')
    clearInterval(this.interval)
    this.interval = null
  }

  runTetris() {
    let res = this.runStep()

    this.interval = setInterval(() => {
      const isEnd = !this.runStep()

      if (isEnd) {
        this.endGame()
      }
    }, 200)
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
      figure.setPosition(figurePos)
    }

    if (this.pointsStack.canChangePosFigure(figure, figurePos)) {
      figure.setPosition(figurePos)
      this.renderer.renderPoints(
        this.getStackAndFigurePoints(figure, this.pointsStack)
      )
    } else {
      if (figurePos[1] === 0) {
        return false
      }
      this.pointsStack.addFigure(figure)
      this.figureStack.pop()
      this.renderer.renderPoints(this.pointsStack.getPoints())
    }

    return true
  }
}
