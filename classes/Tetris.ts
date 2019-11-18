import FigureFactory from './Figure/FigureFactory'
import { getRndValInterval } from './helpers'
import PointsStack from './PointsStack/PointsStack'
import PositionerFacad from './Positioner/Positioner'
import RendererCanvas from './RendererCanvas'
import Positioner from './Positioner/Positioner'
import Statistic from './Statistic/Statistic'
import Figure from './Figure/Figure'

interface ITetris {}

export class Tetris implements ITetris {
  renderer: RendererCanvas
  pointsStack: PointsStack
  //NodeJS.Timeout
  interval: any
  figure: Figure | null = null
  positioner: Positioner | null = null
  statistic: Statistic

  constructor() {
    this.pointsStack = new PointsStack(10, 5) as PointsStack
    this.renderer = this.createRenderer(this.pointsStack) as RendererCanvas
    this.statistic = new Statistic()
    this.init()
  }

  private init() {
    this.renderer.renderGrid()
    this.initKeyListener()
    this.runCircleFigure()
  }

  private runCircleFigure() {
    this.figure = FigureFactory.createRandomFigure(this.pointsStack.getSize())
    this.positioner = new Positioner(this.pointsStack, this.figure)

    if (this.positioner.canAddFigureToStack()) {
      this.render()
      this.runFigureDownInterval()
    } else {
      clearInterval(this.interval)
      this.endGame()
    }
  }

  endGame() {
    this.interval = null
    this.positioner = null
    console.log('endGame')
  }

  private runFigureDownInterval() {
    this.interval = setInterval(() => {
      const positioner = this.positioner as Positioner
      if (positioner.canShrinkFigureDown()) {
        positioner.shrinkFigureDown()
        this.render()
      } else if (positioner.canAddFigureToStack()) {
        positioner.addFigureToStack()
        clearInterval(this.interval)
        this.interval = null
        this.pointsStack.collapse()
        this.runCircleFigure()
      } else {
        clearInterval(this.interval)
        this.endGame()
      }
    }, (this.statistic.data.speed / 3) * 100)
  }

  private initKeyListener() {
    document.addEventListener('keydown', e => {
      if (!this.interval || !this.positioner) {
        return
      }

      this.positioner.shrinkFigureByKey(e.keyCode)
      this.render()
    })
  }

  private createRenderer(pointsStack: PointsStack) {
    const { columns, rows } = pointsStack.getSize()
    return new RendererCanvas(columns * 20, rows * 20)
  }

  render() {
    let points = {}

    if (!this.figure) {
      points = this.pointsStack.getMapPoints()
    } else {
      points = {
        ...this.pointsStack.getMapPoints(),
        ...this.figure.getMapPoints(),
      }
    }

    this.renderer.renderPoints(points)
  }
}
