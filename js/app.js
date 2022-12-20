import * as audio from './audio.js'

let snakeHeadIdx, appleIdx, currentDir, moveInterval, snakeBody


document.querySelector('body').addEventListener('keydown', changeDirection)


let squareEls = document.querySelectorAll('.sqr')

init()

function init() {
  snakeHeadIdx = pickRandomSnakeLoc()
  appleIdx = generateApple()
  currentDir = null
  snakeBody = []
  generateBoard()
}

function startGame() {
  moveInterval = setInterval(() => {
    if (checkForCollision()) {
      clearInterval(moveInterval)
      return
    }
    checkForSnakeOnApple()
    adjustSnakeHeadPos()
    console.log(snakeHeadIdx, 'snakeheadidx')
    console.log(currentDir, 'currentdir')
    generateBoard()
    adjustSnakeBody()
  }, 300)
}

function adjustSnakeBody() {
  if (snakeBody.length) {
    snakeBody.unshift(snakeHeadIdx)
    snakeBody.pop()
  }
  console.log(snakeBody)
}

function changeDirection(evt) {
  if (!moveInterval) {
    startGame()
  }
  console.log(evt.key)
  if (evt.key === 'ArrowUp') {
    console.log('up pressed')
    currentDir = 'n'
  } else if (evt.key === 'ArrowRight') {
    console.log('right pressed')
    currentDir = 'e'
  } else if (evt.key === 'ArrowDown') {
    console.log('down pressed')
    currentDir = 's'
  } else if (evt.key === 'ArrowLeft') {
    console.log('left pressed')
    currentDir = 'w'
  }
}

function adjustSnakeHeadPos() {
  if (currentDir === 'n') {
    snakeHeadIdx = snakeHeadIdx - 18 
  }
  if (currentDir === 'e') {
    snakeHeadIdx = snakeHeadIdx + 1
  }
  if (currentDir === 's') {
    snakeHeadIdx = snakeHeadIdx + 18
  }
  if (currentDir === 'w') {
    snakeHeadIdx = snakeHeadIdx -1
  }
}

function pickRandomSnakeLoc() {
  let idxToPlaceSnake 
  while(!idxToPlaceSnake || squareEls[idxToPlaceSnake].classList.contains('edge')) {
    idxToPlaceSnake = Math.floor(Math.random() * squareEls.length)
  }
  return idxToPlaceSnake
}

function generateApple() {
  let idxToPlaceApple
  while(!idxToPlaceApple || squareEls[idxToPlaceApple].classList.contains('edge')) {
    idxToPlaceApple = Math.floor(Math.random() * squareEls.length)
  }
  return idxToPlaceApple
}

function checkForSnakeOnApple() {
  if (snakeHeadIdx === appleIdx) {
    audio.playAppleSound()
    snakeBody.push(appleIdx)
    appleIdx = generateApple()
  }
}

function checkForCollision() {
  console.log(squareEls[snakeHeadIdx].className)
  if (squareEls[snakeHeadIdx].classList.contains('edge')) {
    audio.playCollisionSound()
    console.log('GAME OVER, COLLISION')
    return true
  }
}

function growSnake() {

}

function generateBoard() {
  let boardObjs = []
  squareEls.forEach((el, idx) => {
    let boardObj = {
      snakeHead: snakeHeadIdx === idx ? true : false,
      apple: appleIdx === idx ? true : false,
      snakeBod: snakeBody.includes(idx) ? true : false
    }
    boardObjs.push(boardObj)
  })
  renderBoard(boardObjs)
}

function renderBoard(boardObjs) {
  squareEls.forEach((el, idx) => {
    if (boardObjs[idx].snakeHead) {
      el.style.backgroundColor = 'lightgreen'
      el.textContent = '🐍'
    } else if (boardObjs[idx].apple) {
      el.style.backgroundColor =  'lightpink'
      el.textContent = '🍎'
    } else if (boardObjs[idx].snakeBod) {
      el.style.backgroundColor =  'lightgreen'
      el.textContent = ''
    } else if (!boardObjs[idx].snakeHead && !boardObjs[idx].apple) {
      el.style.backgroundColor = ''
      el.textContent = ''
    }
  })
}