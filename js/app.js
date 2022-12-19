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
    adjustSnakeHeadPos()
    console.log(snakeHeadIdx, 'snakeheadidx')
    console.log(currentDir, 'currentdir')
    generateBoard()
  }, 1000)
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
    snakeHeadIdx = snakeHeadIdx - 16 
  }
  if (currentDir === 'e') {
    snakeHeadIdx = snakeHeadIdx + 1
  }
  if (currentDir === 's') {
    snakeHeadIdx = snakeHeadIdx + 16
  }
  if (currentDir === 'w') {
    snakeHeadIdx = snakeHeadIdx -1
  }
}

function pickRandomSnakeLoc() {
  return Math.floor(Math.random() * squareEls.length)
}

function generateApple() {
  return Math.floor(Math.random() * squareEls.length)
}

function checkForSnakeOnApple() {

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
      el.style.backgroundColor = 'green'
    } if (boardObjs[idx].apple) {
      el.style.backgroundColor =  'red'
    }
  })
}