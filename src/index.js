
import { displayHeader, displayGrid } from './dom';
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

Game()
