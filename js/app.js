let snakeHeadIdx, appleIdx, currentDir, moveInterval

document.querySelector('body').addEventListener('keydown', changeDirection)



let squareEls = document.querySelectorAll('.sqr')

init()

function init() {
  snakeHeadIdx = pickRandomSnakeLoc()
  appleIdx = generateApple()
  currentDir = null
  generateBoard()
}

function startGame() {
  moveInterval = setInterval(() => {
    if (checkForCollision()) {
      clearInterval(moveInterval)
      return
    }
    adjustSnakeHeadPos()
    console.log(snakeHeadIdx, 'snakeheadidx')
    console.log(currentDir, 'currentdir')
    generateBoard()
  }, 500)
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

}

function checkForCollision() {
  console.log(squareEls[snakeHeadIdx].className)
  if (squareEls[snakeHeadIdx].classList.contains('edge')) {
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
      apple: appleIdx === idx ? true : false
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
    } if (boardObjs[idx].apple) {
      el.style.backgroundColor =  'lightpink'
      el.textContent = '🍎'
    } else if (!boardObjs[idx].snakeHead && !boardObjs[idx].apple) {
      el.style.backgroundColor = ''
      el.textContent = ''
    }
  })
}