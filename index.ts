import { Tetris } from './classes/Tetris'

let tetris = new Tetris()

let res = tetris.runStep()

let interval = setInterval(() => {
  if (res) {
    res = tetris.runStep()
  } else {
    alert('!!')
    clearInterval(interval)
  }
}, 200)
