
import { populateHeader, populateGrid } from './dom.js';
import './styles.css';

const playerColHeader = document.querySelector('.player__col-header');
const playerRowHeader = document.querySelector('.player__row-header');
const playerGrid = document.querySelector('.player__grid');

populateHeader(playerColHeader, 'col');
populateHeader(playerRowHeader, 'row');

populateGrid(playerGrid);
