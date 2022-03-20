import { LayoutParams } from './constants'
import Figure from './Figure/Figure'
import FigureFactory from './Figure/FigureFactory'
import HeapPoints from './HeapPoints/HeapPoints'
import HeapFigureBehaviorFacade from './HeapFigureBehavior/HeapFigureBehaviorFacade'
import { IRenderer } from './Renderer/RendererType'
// import Statistic from './Statistic/Statistic'

export class Tetris {
  renderer: IRenderer
  //NodeJS.Timeout
  interval: any
  figure: Figure | null = null
  nextFigure: Figure | null = null
  behavior!: HeapFigureBehaviorFacade
  heap!: HeapPoints
  size!: LayoutParams
  level = 1

  constructor(config: { renderer: IRenderer; size: LayoutParams }) {
    const { renderer, size } = config
    this.renderer = renderer
    this.size = size
    this.prepareGame()
  }

  private prepareGame() {
    this.resetGame()
    this.initKeyListener()
    this.generateRound()
    this.render()
  }

  private resetGame() {
    const { columns, rows } = this.size
    this.heap = new HeapPoints(columns, rows)
    this.level = 1
    this.figure = null
    this.nextFigure = null
  }

  private generateRound() {
    this.figure = this.nextFigure || FigureFactory.createRandomFigure(this.heap)
    this.nextFigure = FigureFactory.createRandomFigure(this.heap)
    console.log('Curr Figure ===>', this.figure.toStirng())
    console.log('Next Figure ===>', this.nextFigure.toStirng())
    this.behavior = new HeapFigureBehaviorFacade(this.heap, this.figure)

    this.interval = setInterval(() => {
      this.tickFigure()
    }, 500)
  }

  endGame() {
    this.resetInterval()
    alert('endGame')
  }

  resetInterval = () => {
    clearInterval(this.interval)
  }

  private tickFigure(wasTicked: boolean = false) {
    if (this.behavior.canPushFigureDown()) {
      this.behavior.pushFigureDown()
      this.render()
    } else if (this.behavior.canMergeFigureWithHeap()) {
      // * lock delay https://strategywiki.org/wiki/Tetris/Features
      this.resetInterval()
      this.behavior.mergeFigureWithHeap()
      this.behavior.getHeap().collapseFilledRows()
      this.render()
      this.generateRound()
      this.render()
    } else {
      this.endGame()
      this.render()
    }
  }

  private initKeyListener() {
    document.addEventListener('keydown', (e) => {
      if (!this.behavior) {
        return
      }

      this.behavior.changePosFigureByKey(e.keyCode)
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
