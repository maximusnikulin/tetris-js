import { Colors } from './helpers/helpers'

interface IPoint {
  isFill(): boolean
  getColor(): Colors
}

// export interface Pos {
//   x: number
//   y: number
// }

export class Point implements IPoint {
  private fill: boolean
  private colorFill: Colors
  private colorEmpty: Colors

  constructor(
    fill: boolean = false,
    colorFill: Colors = Colors.transparent,
    colorEmpty: Colors = Colors.transparent
  ) {
    this.colorFill = colorFill
    this.colorEmpty = colorEmpty
    this.fill = fill
  }

  isFill() {
    return this.fill
  }

  getColor() {
    if (!this.fill) {
      return this.colorEmpty
    }

    return this.colorFill
  }
}
