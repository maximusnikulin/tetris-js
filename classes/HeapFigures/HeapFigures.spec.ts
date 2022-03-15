// import HeapFigures, { sum } from './PointsStack'
// import Figure, { FigureType } from '../Figure/Figure'
// import FigureMaker from '../FigureMaker'

// const getSnapshotStack = (pointsStack: HeapFigures) => {
//   const points = []
//   pointsStack.getFlatPoints().forEach((point) => {
//     const { x, y } = point.getPosition()
//     if (!points[y]) {
//       points[y] = []
//     }

//     points[y][x] = point.getValue()
//   })

//   return JSON.stringify(points)
// }

// describe('Test Layout class', () => {
//   let pointsStack: HeapFigures = null
//   let figure: Figure = null
//   beforeEach(() => {
//     pointsStack = new HeapFigures(5, 5)
//   })

//   test('It should either can we change pos points or not', () => {
//     let pointsStack = new HeapFigures(5, 4)
//     let figure = FigureMaker.create(FigureType.first, { x: 0, y: 0 })
//     const points = figure.getPointsArea()
//     expect(pointsStack.canChangePosPoints(points, { dY: 1 })).toBe(true)
//     expect(pointsStack.canChangePosPoints(points, { dY: 3 })).toBe(false)
//     // expect(pointsStack.canChangePosPoints(points, { dX: -1 })).toBe(false)
//     // expect(pointsStack.canChangePosPoints(points, { dX: 1 })).toBe(true)
//     // expect(pointsStack.canChangePosPoints(points, { dX: 2 })).toBe(false)
//   })

//   // test('It should forbid to change', () => {
//   //   // let figureOne = FigureMaker.create(FigureType.first, [0, 3])
//   //   // pointsStack.addPoints(figureOne.getPointsArea())
//   //   // let figureSecond = FigureMaker.create(FigureType.first, [0, 0])
//   //   // const points = figureSecond.getPointsArea()
//   //   // console.log(getSnapshotStack(points))
//   //   // expect(pointsStack.canChangePosPoints(points, { dY: 1 })).toBe(false)
//   // })
// })
