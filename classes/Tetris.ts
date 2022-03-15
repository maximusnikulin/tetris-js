import Figure from './Figure/Figure'
import FigureFactory from './Figure/FigureFactory'
import HeapFigures from './HeapFigures/HeapFigures'
import PositionerFacade from './Positioner/Positioner'
import RendererCanvas from './RendererCanvas'
import Statistic from './Statistic/Statistic'

export class Tetris {
  gridSize = { rows: 20, columns: 10, squareSize: 30 }
  renderer: RendererCanvas
  heapFigures!: HeapFigures
  //NodeJS.Timeout
  interval: any
  figure: Figure | null = null
  // positioner: PositionerFacade | null = null
  // statistic: Statistic

  constructor() {
    const { columns, rows, squareSize } = this.gridSize
    this.renderer = new RendererCanvas(columns, rows, squareSize)
    // this.pointsStack = new HeapFigures(10, 20) as HeapFigures
    // this.statistic = new Statistic()
    this.prepareGame()
  }

  private prepareGame() {
    this.renderer.renderGrid()
    // this.initKeyListener()
    // this.startGame()
  }

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
