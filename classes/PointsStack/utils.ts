// import { Point } from '../Point'
// import { Colors } from 'tetris/types'

// const createPoint = (el: number | [number, Colors]) => {
//   if (Array.isArray(el)) {
//     return new Point(!!el[0], el[1])
//   }

//   return new Point(!!el)
// }

// export const createPointsByPattern = (
//   pattern: (number | [number, Colors])[][]
// ) => {
//   return pattern.map(row => row.map(createPoint))
// }

// export const createRowByPattern = (row: (number | [number, Colors])[]) => {
//   return row.map(createPoint)
// }
