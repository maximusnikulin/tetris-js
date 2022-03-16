import { random, sample } from 'lodash'
import { FigurePatterns, FigureTypes } from '../Figure/FigureTypes'

export function getRndValInterval(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getEmptyLines = (pattern: number[][]) =>
  pattern.reduce(
    (acc, next) => {
      if (acc.done) {
        return acc
      }

      if (next.some(Boolean)) {
        acc.done = true
        return acc
      }

      acc.count++
      return acc
    },
    {
      done: false,
      count: 0,
    }
  ).count

export function flatArray(structure: any[]): any[] {
  return structure.reduce((acc, next) => {
    if (Array.isArray(next)) {
      return acc.concat(flatArray(next as any[]))
    }

    return acc.concat(next)
  }, [])
}

export enum Colors {
  green = 'rgb(131, 235, 122)',
  pink = 'rgb(233, 118, 172)',
  aqua = 'rgb(118, 229, 233)',
  violet = 'rgb(91, 89, 231)',
  yellow = 'rgb(231, 233, 118)',
  transparent = 'transparent',
  lightGrey = 'rgb(212, 212, 212)',
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
  transformKey: (x: number, y: number) => string = (x, y) => `${x}, ${y}`
) => {
  return matrix.reduce((acc, nextRow, pY) => {
    nextRow.forEach((el, pX) => {
      acc[transformKey(pX, pY)] = transformEl(el)
    })

    return acc
  }, {} as Record<string, B>)
}
