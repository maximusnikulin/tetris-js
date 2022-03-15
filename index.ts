import { Tetris } from './classes/Tetris'

// let tetris = new Tetris()

function start() {
  setTimeout(() => {
    const els = window.document.querySelectorAll('.item')
    const someOtherElement = window.document.querySelector('.some')
    var x = someOtherElement.offsetWidth / 3
    for (var i = 0; i < els.length; i += 1) {
      els[i].style.width = x + 'px'
    }

    // for (var i = 0; i < els.length; i += 1) {
    //   console.log(i)

    //   var w = someOtherElement?.offsetWidth / 3
    //   els[i]?.style.width = w + 'px'
    // }
  }, 2000)
}

start()
