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
    this.initListeners()
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

  initListeners() {
    window.addEventListener('keydown', e => {
      const figure = this.getCurrentFigure()
      if (
        (e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 39) ||
        !figure
      ) {
        return
      }

      let [x, y] = figure.getPosition()

      if (e.keyCode === 40) {
        while (this.pointsStack.canChangePosFigure(figure, [x, y])) {
          figure.setPosition([x, y])
          y++
        }

        this.pointsStack.addFigure(figure)
        this.render()
        this.figureStack.pop()
      } else {
        let newPos

        if (e.keyCode === 37) {
          newPos = [x - 1, y]
        }

        if (e.keyCode === 39) {
          newPos = [x + 1, y]
        }

        if (this.pointsStack.canChangePosFigure(figure, newPos)) {
          figure.setPosition(newPos)
          this.render()
        }
      }
    })
  }

  runTetris() {
    let res = this.runStep()

    this.interval = setInterval(() => {
      const isEnd = !this.runStep()

      if (isEnd) {
        this.endGame()
      }
    }, 1000)
  }

  render() {
    this.renderer.renderPoints(
      this.getStackAndFigurePoints(this.getCurrentFigure(), this.pointsStack)
    )
  }

  getCurrentFigure() {
    return this.figureStack[this.figureStack.length - 1] || null
  }

  runStep() {
    let figure = this.getCurrentFigure()
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
    } else {
      if (figurePos[1] === 0) {
        return false
      }
      this.pointsStack.addFigure(figure)
      this.figureStack.pop()
    }

    this.render()
    // if (this.pointsStack.hasRequalsRows()) {

    // }

    return true
  }
}
