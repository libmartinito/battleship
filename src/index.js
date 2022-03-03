
import { displayHeader, displayGrid, displayShips, displayHiddenShip, updateHitDisplay } from './dom';
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

  playerBoard.fillBoardRandomly()
  compBoard.fillBoardRandomly()

  const playerShips = playerBoard.getShipCoordinatesObj()
  const compShips = compBoard.getShipCoordinatesObj()
  displayShips(playerShips, 'player')
  displayShips(compShips, 'computer')

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
        player.attack(compBoard, e.target.dataset.coordinate)
        updateHitDisplay(compBoard)
        displayHiddenShip(e.target)
        checkWinner()
      })
    })
  }

  addBoxEventListener()
}

Game()
