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

  createFigure() {
    return FigureMaker.create(FigureType.first)
  }

  getRenderPoints(figure: Figure, pointsStack: PointsStack) {
    const stackPoints = pointsStack.getPoints()
    if (!figure) {
      return stackPoints
    }

    const figurePoints = figure.getPoints()

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

  handleKeyPress = e => {
    // if (!this.canHandleKey) return
    const figure = this.getCurrentFigure()
    if ((e.keyCode !== 40 && e.keyCode !== 37 && e.keyCode !== 39) || !figure) {
      return
    }

    let [x, y] = figure.getPosition()

    if (e.keyCode === 40) {
      while (this.pointsStack.canChangePosPoints(figure, [x, y])) {
        figure.setPosition([x, y])
        y++
      }

      this.addFigureToStack(figure)
      this.checkEqualRows()
    } else {
      let newPos

      if (e.keyCode === 37) {
        newPos = [x - 1, y]
      }

      if (e.keyCode === 39) {
        newPos = [x + 1, y]
      }

      if (this.pointsStack.canChangePosPoints(figure, newPos)) {
        figure.setPosition(newPos)
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

  // addFigureToStack = (figure: Figure) => {
  //   this.pointsStack.addPoints(figure)
  //   this.figureStack.pop()
  // }

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

    const { width, height } = figure.getSize()

    if (
      // this.pointsStack.canChangePosPoints()
    ) {
      // figure.setPosition(figurePos)
      // this.render()
    } else {
      if (figurePos[1] === 0) {
        return false
      }
      // this.addFigureToStack(figure)
      // this.checkEqualRows()
      // this.render()
    }

    //   return true
  }
}
