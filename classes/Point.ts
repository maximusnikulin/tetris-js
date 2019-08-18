import { Colors } from './Figure/Figure'

interface IPoint {
  value: 0 | 1
  color: Colors
}

export interface Pos {
  x: number
  y: number
}

export class Point implements IPoint {
  value: 0 | 1
  color: Colors
  constructor(value?: 0 | 1, color = Colors.transparent) {
    this.color = color
    if (typeof value !== 'undefined') {
      this.value = value
    }
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
}
