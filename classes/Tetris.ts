import RendererCanvas from './RendererCanvas'
import FigureMaker from './FigureMaker'
import Figure, { FigureType, PosXY } from './Figure/Figure'
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
  //@ts-ignore
  interval: NodeJS.Timeout
  canHandleKey: boolean
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
    this.canHandleKey = true
    this.initListeners()
  }

  createFigure(pos: PosXY) {
    return FigureMaker.create(FigureType.first, pos)
  }

  getRenderPoints(figure: Figure, pointsStack: PointsStack) {
    const stackPoints = pointsStack.getFlatPoints()
    if (!figure) {
      return stackPoints
    }

    const figurePoints = figure.getFlatPoints()

    return stackPoints.map(point => {
      const { x, y } = point.getPosition()
      const matchPoint = figurePoints.find(figPoint => {
        const { x: fpX, y: fpY } = figPoint.getPosition()
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

  handleKeyPress = e => {
    // if (!this.canHandleKey) return
    const figure = this.getCurrentFigure()
    if ((e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 39) || !figure) {
      return
    }

    let { x, y } = figure.getPosition()

    if (e.keyCode === 40) {
      let dY = 1
      while (
        this.pointsStack.canChangePosPoints(figure.getPointsArea(), { dY })
      ) {
        dY++
      }

      figure.setPosition({ y })
      this.addFigureToStack(figure)
    } else {
      let dX = 0

      if (e.keyCode === 37) {
        dX = -1
      }

      if (e.keyCode === 39) {
        dX = 1
      }

      if (this.pointsStack.canChangePosPoints(figure.getPointsArea(), { dX })) {
        figure.setPosition({ x: x + dX })
        this.render()
      }
    }
  }

  initListeners() {
    // window.addEventListener('keydown', e => this.handleKeyPress(e))
  }

  removeListeners() {
    // window.removeEventListener('keydown', this.handleKeyPress)
  }

  runCycle() {
    let res = this.runStep()

    this.interval = setInterval(() => {
      const isEnd = !this.runStep()
      if (isEnd) {
        this.endGame()
      }
    }, 100)
  }

  render() {
    this.renderer.renderPoints(
      this.getRenderPoints(this.getCurrentFigure(), this.pointsStack)
    )
  }

  addFigureToStack = (figure: Figure) => {
    this.pointsStack.addPoints(figure.getPointsArea())
    this.figureStack.pop()
  }

  getCurrentFigure() {
    return this.figureStack[this.figureStack.length - 1] || null
  }

  runStep() {
    let figure = this.getCurrentFigure()
    let dY = 1
    if (!figure) {
      dY = 0
      let figurePos = { x: 2, y: 0 }
      figure = this.createFigure(figurePos)
      this.figureStack.push(figure)
    }

    let { x, y } = figure.getPosition()
    if (this.pointsStack.canChangePosPoints(figure.getPointsArea(), { dY })) {
      figure.setPosition({ y: y + dY })
      this.render()
    } else {
      if (y === 0) {
        return false
      }
      this.addFigureToStack(figure)
      this.render()
    }

    return true
  }
}
