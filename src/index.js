
import { displayHeader, displayGrid, displayShips } from './dom';
import './styles.css';
import { Gameboard, Player } from './app'

const playerColHeader = document.querySelector('.player__col-header');
const playerRowHeader = document.querySelector('.player__row-header');
const playerGrid = document.querySelector('.player__grid');

const compColHeader = document.querySelector('.computer__col-header');
const compRowHeader = document.querySelector('.computer__row-header');
const compGrid = document.querySelector('.computer__grid');

displayHeader(playerColHeader, 'col');
displayHeader(playerRowHeader, 'row');
displayGrid(playerGrid);

displayHeader(compColHeader, 'col');
displayHeader(compRowHeader, 'row');
displayGrid(compGrid);

const Game = () => {
  const playerBoard = Gameboard()
  const compBoard = Gameboard()
  const player = Player()
  const comp = Player()
/*
  playerBoard.placeShip('A1', 'E1')
  playerBoard.placeShip('A3', 'D3')
  playerBoard.placeShip('F3', 'I3')
  playerBoard.placeShip('A5', 'C5')
  playerBoard.placeShip('E5', 'G5')
  playerBoard.placeShip('A6', 'C6')
  playerBoard.placeShip('A8', 'B8')
  playerBoard.placeShip('D8', 'E8')
  playerBoard.placeShip('G8', 'H8')
  playerBoard.placeShip('A9', 'B9')
*/
  playerBoard.fillBoardRandomly()
  compBoard.placeShip('A1', 'E1')

  const shipCoordinatesObj = playerBoard.getShipCoordinatesObj()
  displayShips(shipCoordinatesObj)

  const checkWinner = () => {
    const ships = compBoard.getShips()
    if(playerBoard.areAllShipsSunk()) {
      console.log('The computer won.')
    } else if(compBoard.areAllShipsSunk()) {
      console.log('You won!')
    }
  }

  const addBoxEventListener = () => {
    const boxArr = document.querySelectorAll('.computer__grid .box')
    boxArr.forEach(box => {
      box.addEventListener('click', (e) => {
        e.target.textContent = 'X'
        player.attack(compBoard, e.target.dataset.coordinate)
        checkWinner()
      })
    })
  }

  addBoxEventListener()
}

Game()