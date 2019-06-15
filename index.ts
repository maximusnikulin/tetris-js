enum FigureType {
  'first' = 1,
  'second',
  'third',
}

interface IFigureMaker {
  generate(type?: FigureType): Figure
}

class FigureMaker {
  static create(type: FigureType) {
    let pattern = []
    // Will be random value
    // Should be in empty space

    if (type === FigureType.first) {
      pattern[0] = [0, 1, 1, 0]
      pattern[1] = [1, 1, 1, 1]
    }

    if (type === FigureType.second) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [0, 0, 0, 1]
    }

    if (type === FigureType.third) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [1, 0, 0, 0]
    }

    return new Figure(pattern, [2, -2])
  }
}

interface IFigure {}
class Figure {
  // Standart size of figure 4 x 2
  pattern: (0 | 1)[][]
  position: number[]
  htmlNode: HTMLDivElement
  constructor(pattern: (0 | 1)[][], position: number[]) {
    this.pattern = pattern
    this.position = position
    this.htmlNode = document.createElement('div')
  }

  getPattern() {
    return this.pattern
  }

  getPosition() {
    return this.position
  }

  updatePosition(diffX: number, diffY: number) {
    this.position[0] += diffX
    this.position[1] += diffY
  }
}

interface ILayout {}

class Layout {
  grid: number[][]
  node: HTMLElement | null
  rect: ClientRect | DOMRect
  columns: number
  rows: number
  constructor(rows: number, columns: number) {
    this.rows = rows
    this.columns = columns
    this.grid = []
    this.node = document.getElementById('js-tetris')
    this.rect = this.node.getBoundingClientRect()

    // size of 1 cell = 20px
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (!this.grid[i]) {
          this.grid[i] = []
        }
        this.grid[i][j] = 0
      }
    }
  }

  fillLayoutOne(pattern: number[][], start: number[]): boolean {
    let [x, y] = start
    pattern.forEach((row, indexRow) => {
      row.forEach((col, indexCol) => {
        this.grid[y + indexRow + 1][x + indexCol] = col
      })
    })

    return true
  }

  getNode() {
    return this.node
  }

  renderFigure(figure: Figure) {
    const currPos = figure.getPosition()
    const pattern = figure.getPattern()
    const [x, y] = currPos

    const html = `
      <div class='figure' style='position: absolute;      
      left: ${x * 20}px;
      top: ${y * 20}px'>
        ${pattern.reduce((acc, nextRow) => {
          return (
            acc +
            `
            <div class='figure__row'>${nextRow.reduce((acc, next) => {
              return (
                acc +
                `<div class="figure__point ${
                  next ? 'active' : ''
                }">${next}</div>`
              )
            }, '')}</div>
          `
          )
        }, '')}
      </div>
    `

    figure.htmlNode.innerHTML = html
    this.node.appendChild(figure.htmlNode)
  }
}

const config = {
  rows: 8,
  columns: 20,
}

class Compositor {
  private figureCreator: typeof FigureMaker
  private layout: Layout
  private currentFigure: Figure
  figureStack: Figure[]
  interval: number
  constructor(layout: Layout, figureCreator: typeof FigureMaker) {
    this.figureCreator = figureCreator
    this.layout = layout
    this.currentFigure = null
    this.figureStack = []

    this.runStep()
    this.interval = setInterval(() => {
      this.runStep()
    }, 200)
  }

  onPressLeft(e: KeyboardEvent) {}

  onPressRight(e: KeyboardEvent) {}

  keyListeners() {
    document.addEventListener('keypress', e => {
      switch (e.keyCode) {
        case 39:
          this.onPressRight(e)
          break
        case 37:
          this.onPressRight(e)
          break
      }
    })
  }

  generateFigure() {
    const figure = this.figureCreator.create(
      !this.figureStack.length ? FigureType.first : FigureType.second
    )

    this.figureStack.push(figure)
    return figure
  }

  canChangePosition(diffX: number, diffY: number): boolean {
    const currPosFigure = this.currentFigure.getPosition()
    const figureX = currPosFigure[0]
    const figureY = currPosFigure[1]

    const patternFigure = this.currentFigure.getPattern()
    const figureWidth = patternFigure[0].length
    const figureHeight = patternFigure.length

    // debugger
    if (
      figureY + figureHeight >= config.rows ||
      figureX + figureWidth >= config.columns ||
      figureX + diffX < 0
    ) {
      return false
    }

    const nextStepInterval = [figureX, figureX + figureWidth]
    const layoutInterval = this.layout.grid[
      figureY + diffY + figureHeight
    ].slice(...nextStepInterval)

    return !layoutInterval.some((layoutPoint, index) => {
      return patternFigure[figureHeight - 1][index] + layoutPoint > 1
    })
  }

  updateLayout() {
    this.layout.renderFigure(this.currentFigure)
  }

  runStep() {
    // TODO: Refactor it
    if (!this.currentFigure) {
      this.currentFigure = this.generateFigure()
      for (let i = 0; i < 2; i++) {
        if (this.canChangePosition(0, 1)) {
          this.currentFigure.updatePosition(0, 1)
        } else {
          clearInterval(this.interval)
          alert('end game')
          return
        }
      }

      this.updateLayout()
    } else if (this.canChangePosition(0, 1)) {
      this.currentFigure.updatePosition(0, 1)
      this.updateLayout()
    } else {
      const [x, y] = this.currentFigure.getPosition()
      this.layout.fillLayoutOne(this.currentFigure.getPattern(), [x, y])
      this.currentFigure = null
    }
  }
}

let tetris = new Compositor(new Layout(40, 20), FigureMaker)
