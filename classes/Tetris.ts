import Figure from './Figure/Figure'
import FigureFactory from './Figure/FigureFactory'
import PointsStack from './PointsStack/PointsStack'
import PositionerFacade from './Positioner/Positioner'
import RendererCanvas from './RendererCanvas'
import Statistic from './Statistic/Statistic'

interface ITetris {}

export class Tetris implements ITetris {
  renderer: RendererCanvas
  pointsStack: PointsStack
  //NodeJS.Timeout
  interval: any
  figure: Figure | null = null
  positioner: PositionerFacade | null = null
  // statistic: Statistic

  constructor() {
    this.pointsStack = new PointsStack(10, 20) as PointsStack
    this.renderer = this.createRenderer(this.pointsStack) as RendererCanvas
    // this.statistic = new Statistic()
    // this.init()
  }

  // private init() {
  //   this.renderer.renderGrid()
  //   this.initKeyListener()
  //   this.startGame()
  // }

  // private startGame() {
  //   this.tickGame()
  // }

  // endGame() {
  //   this.render()
  //   this.resetInterval()
  //   console.log('endGame')
  // }

  // resetInterval = () => {
  //   clearInterval(this.interval)
  // }

  // public tickGame() {
  //   this.figure = FigureFactory.createRandomFigure(this.pointsStack.getSize())
  //   this.positioner = new PositionerFacade(this.pointsStack, this.figure)

  //   if (this.positioner.canAddFigureToStack()) {
  //     this.render()
  //   }

  //   const positioner = this.positioner
  //   // this.interval = setInterval(
  //   //   () => this.tickFigure(positioner),
  //   //   (this.statistic.data.speed / 3) * 100
  //   // )
  // }

  // private tickFigure(positioner: PositionerFacade) {
  //   if (positioner.canShrinkFigureDown()) {
  //     positioner.shrinkFigureDown()
  //     this.render()
  //   } else if (positioner.canAddFigureToStack()) {
  //     positioner.addFigureToStack()
  //     this.resetInterval()
  //     this.pointsStack.collapse()
  //     this.tickGame()
  //   } else {
  //     this.endGame()
  //   }
  // }

  private initKeyListener() {
    // document.addEventListener('keydown', (e) => {
    //   if (!this.positioner) {
    //     return
    //   }
    //   this.positioner.shrinkFigureByKey(e.keyCode)
    //   this.render()
    // })
  }

  private createRenderer(pointsStack: PointsStack) {
    const { columns, rows } = pointsStack.getSize()
    return new RendererCanvas(columns * 20, rows * 20)
  }

  // render() {
  //   let points = {}

  //   if (!this.figure) {
  //     points = this.pointsStack.getMapPoints()
  //   } else {
  //     points = {
  //       ...this.pointsStack.getMapPoints(),
  //       ...this.figure.getMapPoints(),
  //     }
  //   }

  //   this.renderer.renderPoints(points)
  // }
}
