import Figure, { FigureType } from './Figure/Figure'
import FigureFactory from './FigureFactory'
import { getRndValInterval } from './helpers'
import PointsStack from './PointsStack/PointsStack'
import PositionerFacad from './Positioner'
import RendererCanvas from './RendererCanvas'
import Positioner from './Positioner'
import Statistic from './Statistic/Statistic'

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
    this.pointsStack = new PointsStack(10, 20) as PointsStack
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
    console.log('!!!')
    this.figure = this.createFigure()
    this.positioner = new Positioner(this.pointsStack, this.figure)

    if (this.positioner.canAddFigureToStack()) {
      this.render()
      this.runFigureDownInterval()
    } else {
      clearInterval(this.interval)
      console.log('end')
    }
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
        console.log('end')
      }
    }, this.statistic.data.speed * 100)
  }

  private initKeyListener() {
    document.addEventListener('keydown', e => {
      if (!this.positioner) {
        return
      }

      this.positioner.shrinkFigureByKey(e.keyCode)
      this.render()
    })
  }

  private createFigure() {
    const typeId = getRndValInterval(1, 5)
    const { columns } = this.pointsStack.getSize()
    const figure = FigureFactory.create(typeId)
    let rndX = getRndValInterval(0, columns - figure.getSize().width)
    figure.setPosition([rndX, 0])
    return figure
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
