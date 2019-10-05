import Figure, { FigureType, Colors } from './Figure/Figure'
import FigureFactory from './FigureFactory'
import { getRndValInterval } from './helpers'
import PointsStack from './PointsStack/PointsStack'
import RendererCanvas from './RendererCanvas'
import { createPointsByPattern } from './PointsStack/utils'
import { p } from './PointsStack/__test__/mocks'
import { Point } from './Point'
import PositionerFacad from './PositionerFacad'

interface ITetris {}

export class Tetris implements ITetris {
  renderer: RendererCanvas
  pointsStack: PointsStack
  figureStack: Figure[]
  square: number
  width: number
  height: number
  isFull: boolean
  //NodeJS.Timeout
  interval: any
  figure: any
  positioner: PositionerFacad
  positionerFigureStack: PositionerFacad
  constructor() {
    this.pointsStack = new PointsStack(10, 20)
    // this.pointsStack.points = createPointsByPattern([
    //   [0, 0, p(1), 0, 0],
    //   [p(1), p(1), p(1), p(1), p(1)],
    //   [p(1), p(1), p(1), p(1), p(1)],
    //   [p(1), p(1), 0, p(1), p(1)],
    // ])

    const { columns, rows } = this.pointsStack.getSize()
    this.renderer = new RendererCanvas(columns * 20, rows * 20)
    this.figureStack = []
    this.figure = null
    this.renderer.renderGrid()
    this.runFigure()
  }

  createFigure() {
    const { columns } = this.pointsStack.getSize()
    const figure = FigureFactory.create(FigureType.first)
    let rndX = getRndValInterval(0, columns - figure.getSize().width)
    figure.setPosition([rndX, 0])
    return figure
  }

  setActiveFgiure() {
    this.figure = this.figureStack.pop()
  }

  fillFigureStack() {
    while (this.figureStack.length < 2) {
      this.figureStack.unshift(this.createFigure())
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

  /** Incapsulate it to figure????:start **/
  stepFigure() {
    if (this.positioner.figureIsShrinkedDown()) {
      this.render()
      return
    }

    if (this.positioner.figurePointsAddedToStack()) {
      this.render()
      clearInterval(this.interval)
      // this.pointsStack.shrink()
      this.runFigure()
    } else {
      clearInterval(this.interval)
      this.endGame()
    }
  }

  endGame() {
    clearInterval(this.interval)
    this.figure = null
    alert('End game')
  }

  runFigure() {
    this.fillFigureStack()
    this.setActiveFgiure()
    this.positioner = new PositionerFacad(this.pointsStack, this.figure)

    if (this.positioner.canAddFigure()) {
      this.render()
      this.interval = setInterval(this.stepFigure.bind(this), 10)
    } else {
      this.endGame()
    }
  }
  /** Incapsulate it to figure????:end **/
}
