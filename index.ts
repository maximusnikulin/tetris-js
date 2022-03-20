import RendererCanvas from './classes/Renderer/RendererCanvas'
import { Tetris } from './classes/Tetris'

const size = {
  columns: 10,
  rows: 10,
  square: 30,
}

// * DI for renderer, so we can replace to webGL, simple HTML, or Canvas like now
const renderer = new RendererCanvas(size)

new Tetris({
  size,
  renderer,
})
