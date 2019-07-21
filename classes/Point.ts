import { Colors } from './Figure/Figure'

interface IPoint {
  x: number
  y: number
  value: 0 | 1
  color: Colors
}

export class Point implements IPoint {
  x: number
  y: number
  value: 0 | 1
  color: Colors
  constructor(x: number, y: number, value?: 0 | 1, color = Colors.transparent) {
    this.x = x
    this.y = y
    this.color = color
    if (typeof value !== 'undefined') {
      this.value = value
    }
  }

  getPosition() {
    return [this.x, this.y]
  }

  getValue() {
    return this.value
  }

  getColor() {
    return this.color
  }

  setColor(color: Colors) {
    this.color = color
  }

  setValue(value: 1 | 0) {
    this.value = value
  }

  setPosition(pos: number[]) {
    this.x = pos[0]
    this.y = pos[1]
  }
}
