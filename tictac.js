const xClass = 'x'
const circleClass = 'circle'
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const gameCells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const playersTurn = document.querySelector('[players-turn]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame);


function startGame() {
  winningMessageTextElement.innerText = ''
  circleTurn = false
  playersTurn.innerText = "It's X's Turn!"
  gameCells.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? circleClass : xClass
  placeMarker(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    takeTurns()
  }
}

function endGame(draw) {
  playersTurn.innerText = ""
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "Circle's" : "X's"} Win!`
  }
  winningMessageElement.classList.add('show')

}

function isDraw() {
  return [...gameCells].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}

function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass)
}

function takeTurns() {
  circleTurn = !circleTurn
  if (circleTurn) {
    //display O turn else X turn
    playersTurn.innerText = "It's Circle's Turn!"
  } else {
    playersTurn.innerText = "It's X's Turn!"
  }
}

// playersTurn.innerText = circlesTurn ? "It's Circles Turn!" : "It's X's turn!";

function checkWin(currentClass) {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return gameCells[index].classList.contains(currentClass)
    })
  })
}

