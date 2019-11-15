import { Point } from '../Point'

export enum FigureTypes {
  O = 0,
  S,
  J,
  L,
  I,
}

export enum Colors {
  green = 'green',
  blue = 'blue',
  aqua = 'aqua',
  violet = 'violet',
  yellow = 'yellow',
  transparent = 'transparent',
}

export interface FigureState {
  patterns: number[][][]
  setNextPattern: () => void
  getPattern: () => number[][]
  activePattern: number
}

export interface IFigure {}

class Figure implements IFigure {
  position: number[]
  color: Colors
  state: FigureState

  constructor(state: FigureState, position: number[] = [0, 0], color: Colors) {
    this.state = state
    this.position = position
    this.color = color
  }

  setPosition(pos: number[]) {
    this.position = pos
  }

  rotateFigure() {}

  getSize() {
    return {
      height: this.state.getPattern().length,
      width: this.state.getPattern()[0].length,
    }
  }

  getMapPoints() {
    let coordPoint: { [key: string]: Point } = {}

    this.state.getPattern().forEach((ptrnRow, y) => {
      ptrnRow.forEach((value, x) => {
        if (!value) {
          return
        }

        coordPoint[
          `${x + this.position[0]},${y + this.position[1]}`
        ] = new Point(!!value, value ? this.color : Colors.transparent)
      })
    })

    return coordPoint
  }

  isFillPoint(pos: number[]) {
    const [x, y] = pos
    return !!this.state.getPattern()[y][x]
  }

  getPattern() {
    return this.state.getPattern()
  }

  getPosition() {
    return this.position
  }

  getColor() {
    return this.color
  }
}

export default Figure
