import { random, sample } from 'lodash'
import { Colors } from '../constants'
import Figure from '../Figure/Figure'
import { FigurePatterns, FigureTypes } from '../Figure/FigureTypes'
import HeapFigures from '../HeapPoints/HeapFigures'
import { Point } from '../Point'
import HeapFigureBehaviorFacade from '../HeapFigureBehavior/PositionerFacade'

export function getRndValInterval(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const getRandomColor = () => {
  const nameColor = sample(
    Object.keys(Colors).slice(0, 4)
  ) as keyof typeof Colors

  return Colors[nameColor]
}

export const getRandomPattern = () => {
  const rndType = sample(Object.keys(FigurePatterns)) as FigureTypes
  const patterns = FigurePatterns[rndType]
  const rndPatternIndex = random(patterns.length - 1)
  return {
    type: rndType,
    index: rndPatternIndex,
  }
}

export const matrixToMap = <T, B = T>(
  matrix: T[][],
  transformEl: (el: T) => B = (el) => el as unknown as B,
  transformKey: (x: number, y: number) => string = (x, y) => `${x},${y}`,
  filter: (el: T) => boolean = () => true
) => {
  return matrix.reduce((acc, nextRow, pY) => {
    nextRow.forEach((el, pX) => {
      if (filter(el)) {
        acc[transformKey(pX, pY)] = transformEl(el)
      }
    })

    return acc
  }, {} as Record<string, B>)
}

export const createPointsByPattern = (
  pattern: number[][],
  colorFill: Colors = Colors.green
) => {
  return pattern.map((row) => row.map((el) => new Point(el === 1, colorFill)))
}

export const getSnapHeapAndFigure = (positiner: HeapFigureBehaviorFacade) => {
  const heap = positiner.getHeap()
  const figure = positiner.getFigure()
  return getSnapExplicitDebug(heap, figure)
}

export const getSnapPoints = (
  points: Point[][],
  pointsCompare: { [key: string]: Point } = {}
) => {
  return points.reduce((acc, row, y) => {
    acc.push(
      JSON.stringify([
        row
          .map((p, x) => {
            const pointInFigure = pointsCompare[`${x},${y}`]
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

export const getSnapExplicitDebug = (heap: HeapFigures, figure?: Figure) => {
  const figurePoints = figure?.getPointsMap() ?? {}
  const heapPoints = heap.getPoints()
  return getSnapPoints(heapPoints, figurePoints)
}

export const toConsole = (res: any[]) => {
  return '\n' + res.join('\n')
}
