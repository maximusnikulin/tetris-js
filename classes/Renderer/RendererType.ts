import { Point } from '../Point'

export interface IRenderer {
  renderGrid(): void
  renderPoints(points: Point[]): void
}
