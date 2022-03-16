import { Colors } from './Figure/Figure'

interface IPoint {
  isFill(): boolean
  getColor(): Colors
}

export interface Pos {
  x: number
  y: number
}

export class Point implements IPoint {
  private fill: boolean
  private color: Colors
  pos: Pos

  constructor(
    fill: boolean = false,
    pos: Pos,
    color: Colors = Colors.transparent
  ) {
    this.color = color
    this.fill = fill
    this.pos = pos
  }

  isFill() {
    return this.fill
  }

  getPos() {
    return this.pos
  }

  getColor() {
    if (!this.fill) {
      return Colors.transparent
    }

    return this.color
  }
}
