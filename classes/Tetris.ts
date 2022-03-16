import Figure from './Figure/Figure'
import FigureFactory from './Figure/FigureFactory'
import HeapFigures from './HeapFigures/HeapFigures'
import PositionerFacade from './Positioner/Positioner'
import RendererCanvas from './Renderer/RendererCanvas'
import { IRenderer } from './Renderer/RendererType'
// import Statistic from './Statistic/Statistic'

export interface TetrisConfig {
  renderer: IRenderer
  columns: number
  rows: number
  square: number
}
export class Tetris {
  renderer: IRenderer
  heapFigures: HeapFigures
  //NodeJS.Timeout
  interval: any
  figure: Figure | null = null
  positioner!: PositionerFacade
  // statistic: Statistic
  config: TetrisConfig

  constructor(config: TetrisConfig) {
    const { columns, rows, renderer } = config
    this.config = config
    this.heapFigures = new HeapFigures(columns, rows)
    this.positioner = new PositionerFacade(this.heapFigures)
    this.renderer = renderer
    FigureFactory.init(columns, rows)

    this.prepareGame()

    this.startGame()
  }

  startGame() {
    this.tick()
  }

  private prepareGame() {
    this.renderer.renderGrid()
    this.initKeyListener()
  }

  private tick() {
    this.figure = FigureFactory.createRandomFigure()
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
    const points = [
      ...this.heapFigures.getPoints(),
      ...(this.figure?.getPoints() ?? []),
    ]

    this.renderer.renderPoints(points)
  }
}
