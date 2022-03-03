
import { displayHeader, displayGrid, displayShips, displayHiddenShip, updateHitDisplay } from './dom';
import './styles.css';
import { Game } from './app'

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

const game = Game()

const playerShips = game.playerBoard.getShipCoordinatesObj()
const compShips = game.compBoard.getShipCoordinatesObj()

displayShips(playerShips, 'player')
displayShips(compShips, 'computer')

const computerBoxes = document.querySelectorAll('.computer__grid .box')
computerBoxes.forEach(box => {
  box.addEventListener('click', (e) => {
    game.player.attack(game.compBoard, e.target.dataset.coordinate)
    updateHitDisplay(game.compBoard, 'computer')
    displayHiddenShip(e.target)
    game.checkWinner()
    game.comp.compAttack(game.playerBoard)
    updateHitDisplay(game.playerBoard, 'player')
    game.checkWinner()
  })
})
