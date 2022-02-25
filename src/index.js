
import { populateHeader, populateGrid } from './dom.js';
import './styles.css';

const playerColHeader = document.querySelector('.player__col-header');
const playerRowHeader = document.querySelector('.player__row-header');
const playerGrid = document.querySelector('.player__grid');

const compColHeader = document.querySelector('.computer__col-header');
const compRowHeader = document.querySelector('.computer__row-header');
const compGrid = document.querySelector('.computer__grid');

populateHeader(playerColHeader, 'col');
populateHeader(playerRowHeader, 'row');
populateGrid(playerGrid);

populateHeader(compColHeader, 'col');
populateHeader(compRowHeader, 'row');
populateGrid(compGrid);
