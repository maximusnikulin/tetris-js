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
  constructor(fill: boolean = false, color = Colors.transparent) {
    this.color = color
    this.fill = fill
  }

  isFill() {
    return this.fill
  }

  getColor() {
    return this.color
  }

  setColor(color: Colors) {
    this.color = color
    return this
  }

  setValue(value: boolean) {
    this.fill = value
  }
}
