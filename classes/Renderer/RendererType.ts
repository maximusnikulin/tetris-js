import { Point } from '../Point'

export interface IRenderer {
  renderGrid(): void
  renderArea(points: Record<string, Point>): void
  renderPoints(points: Record<string, Point>, rect: number[]): void
  renderStatistic(
    level: number,
    points: number,
    nextFigure: Record<string, Point>
  ): void
}
