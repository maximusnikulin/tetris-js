import { LayoutParams } from './constants'
import Figure from './Figure/Figure'
import FigureFactory from './Figure/FigureFactory'
import HeapFigures from './HeapFigures/HeapFigures'
import PositionerFacade from './Positioner/PositionerFacade'
import RendererCanvas from './Renderer/RendererCanvas'
import { IRenderer } from './Renderer/RendererType'
// import Statistic from './Statistic/Statistic'

export class Tetris {
  renderer: IRenderer
  heap: HeapFigures
  //NodeJS.Timeout
  interval: any
  figure: Figure | null = null
  nextFigure: Figure | null = null
  positioner: PositionerFacade | null = null

  constructor(config: { renderer: IRenderer; size: LayoutParams }) {
    const {
      renderer,
      size: { columns, rows, square },
    } = config
    this.heap = new HeapFigures(columns, rows)
    this.renderer = renderer
    this.prepareGame()
    this.startGame()
  }

  startGame() {
    this.tick()
  }

  private prepareGame() {
    this.initKeyListener()
  }

  private tick() {
    this.figure = FigureFactory.createRandomFigure(this.heap)
    this.positioner = new PositionerFacade(this.heap, this.figure)
    this.render()
  }

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
    document.addEventListener('keydown', (e) => {
      if (!this.positioner) {
        return
      }

      this.positioner.changePosFigureByKey(e.keyCode)
      this.render()
    })
  }

  render() {
    const points = {
      ...this.heap.getPointsMap(),
      ...(this.figure?.getPointsMap() ?? {}),
    }

    this.renderer.renderPoints(points)
  }
}
