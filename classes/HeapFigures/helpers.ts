import { Colors } from '../helpers/helpers'
import { Point } from '../Point'

const createPoint = (el: number | [number, Colors]) => {
  if (Array.isArray(el)) {
    const [fill = false, color = Colors.transparent] = el

    return new Point(Boolean(fill), color)
  }

  return new Point(!!el)
}

export const createPointsByPattern = (
  pattern: (number | [number, Colors])[][]
) => {
  return pattern.map((row) => row.map(createPoint))
}

export const p: (val: number, color?: Colors) => [number, Colors] = (
  val,
  color = Colors.violet
) => {
  return [val, color]
}
