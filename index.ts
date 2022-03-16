import RendererCanvas from './classes/Renderer/RendererCanvas'
import { Tetris } from './classes/Tetris'

const config = {
  columns: 10,
  rows: 20,
  square: 30,
}

// * DI for renderer, so we can replace to webGL, simple HTML, or Canvas like now
const renderer = new RendererCanvas(config.columns, config.rows, config.square)

new Tetris({
  ...config,
  renderer,
})
