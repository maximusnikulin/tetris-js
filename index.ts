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
    let position = [2, 2]

    if (type === FigureType.first) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [0, 1, 1, 0]
    }

    if (type === FigureType.second) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [0, 0, 0, 1]
    }

    if (type === FigureType.second) {
      pattern[0] = [1, 1, 1, 1]
      pattern[1] = [1, 0, 0, 0]
    }

    return new Figure(pattern, position)
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

  updatePosition(pos: number[]) {
    this.position = pos
  }
}

interface ILayout {}

class Layout {
  layout: number[][]
  node: HTMLElement | null
  rect: ClientRect | DOMRect
  columns: number
  rows: number
  constructor(rows: number, columns: number) {
    this.rows = rows
    this.columns = columns
    this.layout = []
    this.node = document.getElementById('js-tetris')
    this.rect = this.node.getBoundingClientRect()

    // size of 1 cell = 20px
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (!this.layout[i]) {
          this.layout[i] = []
        }
        this.layout[i][j] = 0
      }
    }
  }

  fillLayoutOne(points: number[][]) {
    points.forEach(point => {
      this.layout[point[0]][point[1]] = 1
    })
  }

  getNode() {
    return this.node
  }

  renderFigure(figure: Figure) {
    const currPos = figure.getPosition()
    const pattern = figure.getPattern()
    const startLeftPoint = currPos[0]

    const html = `
      <div class='figure' style='position: absolute;      
      left: ${startLeftPoint[0] * 20}px;
      top: ${startLeftPoint[1] * 20}px'>
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
  rows: 40,
  columns: 20,
}

class Compositor {
  private figureCreator: typeof FigureMaker
  private layout: Layout
  private currentFigure: Figure
  figureStack: Figure[]
  constructor(layout: Layout, figureCreator: typeof FigureMaker) {
    this.figureCreator = figureCreator
    this.layout = layout
    this.currentFigure = null
    this.figureStack = []

    this.runFigure()
  }

  generateFigure() {
    const figure = this.figureCreator.create(FigureType.first)
    this.figureStack.push(figure)
    return figure
  }

  step() {
    // const currPos = this.currentFigure.getPosition()
    // const currY = currPos[0][1]
    // const currX = currPos[0][0]
  }

  runFigure() {
    this.currentFigure = this.generateFigure()
    this.layout.renderFigure(this.currentFigure)
  }
}

let tetris = new Compositor(new Layout(40, 20), FigureMaker)
debugger
