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
  points: number = 0
  debug: boolean = false

  constructor(config: { renderer: IRenderer; size: LayoutParams }) {
    const { renderer, size } = config
    this.renderer = renderer
    this.size = size
    this.prepareGame()
  }

  log(...args: any) {
    if (this.debug) {
      console.log(...args)
    }
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
    this.behavior = new HeapFigureBehaviorFacade(this.heap, this.figure)
    this.figure.setPosition(this.behavior.getRandomPos())
    this.nextFigure = FigureFactory.createRandomFigure(this.heap)
    this.log('Curr Figure ===>', this.figure.toStirng())
    this.log('Next Figure ===>', this.nextFigure.toStirng())
    this.renderStat()

    this.interval = setInterval(() => {
      this.tickFigure()
    }, 800)
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
      this.collapseRows()

      this.render()
      this.generateRound()
      this.render()
    } else {
      this.endGame()
      this.render()
    }
  }

  renderStat() {
    this.renderer.renderStatistic(
      this.level,
      this.points,
      this.nextFigure?.getPointsMap() ?? {}
    )
  }

  addPoints(points: number) {
    this.points += points
    this.level = Math.min(Math.max(Math.floor(this.points / 200), 1), 10)
  }

  collapseRows() {
    const filledRowsLength = this.behavior.getHeap().getFilledRows().length
    this.addPoints(filledRowsLength * 100)
    this.behavior.getHeap().collapseFilledRows()
    this.log('Update Stats ===>', this.level, this.points)
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

    this.renderer.renderArea(points)
  }
}
