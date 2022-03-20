import { Colors } from '../constants'
import { Point } from '../Point'
import PositionerFacade from '../Positioner/PositionerFacade'

const createPoint = (el: number) => {
  // if (Array.isArray(el)) {
  //   const [fill = false, color = Colors.transparent] = el

  //   return new Point(Boolean(fill), color)
  // }

  return new Point(!!el)
}

export const createPointsByPattern = (
  pattern: number[][],
  colorFill: Colors = Colors.green
) => {
  return pattern.map((row) => row.map((el) => new Point(el === 1, colorFill)))
}

export const p: (val: number, color?: Colors) => [number, Colors] = (
  val,
  color = Colors.violet
) => {
  return [val, color]
}

export const getSnapDebug = (positiner: PositionerFacade) => {
  const heap = positiner.getHeap()
  const figure = positiner.getFigure()
  const heapPoints = heap.getPoints()
  const figurePoints = figure.getPointsMap()
  return heapPoints.reduce((acc, row, y) => {
    acc.push(
      JSON.stringify([
        row
          .map((p, x) => {
            const pointInFigure = figurePoints[`${x},${y}`]
            return p.isFill()
              ? 1
              : pointInFigure
              ? pointInFigure.isFill()
                ? 2
                : 3
              : 0
          })
          .join(','),
      ]) as any
    )
    return acc
  }, [])
}
