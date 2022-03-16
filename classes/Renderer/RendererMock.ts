import { Point } from '../Point'
import { IRenderer } from './RendererType'

export class RendererMock implements IRenderer {
  renderGrid(): void {
    return
  }
  renderPoints(points: Record<string, Point>): void {
    return
  }
}
