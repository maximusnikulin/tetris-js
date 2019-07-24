import { Colors, PosXY } from './Figure/Figure'

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
    return { x: this.x, y: this.y }
  }

  getValue() {
    return this.value
  }

  getColor() {
    return this.color
  }

  setColor(color: Colors) {
    this.color = color
    return this
  }

  setValue(value: 1 | 0) {
    this.value = value
    return this
  }

  setPosition(pos: Partial<PosXY>) {
    for (let key in pos) {
      this[key] = pos[key]
    }

    return this
  }
}
