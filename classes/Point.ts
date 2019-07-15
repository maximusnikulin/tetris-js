import { Colors } from './Figure'

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
}