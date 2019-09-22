import { Colors } from './Figure/Figure'

interface IPoint {
  fill: boolean
  color: Colors
}

export interface Pos {
  x: number
  y: number
}

export class Point implements IPoint {
  fill: boolean
  color: Colors
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
  }

  setValue(value: boolean) {
    this.fill = value
  }
}
