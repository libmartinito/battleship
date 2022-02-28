import { Game } from './app'

const displayHeader = (parent, orientation) => {

  for(let i = 0; i < 10; i += 1) {
    const box = document.createElement("div");
    
    if (orientation === "col") {
      box.classList.add("col-box");
      box.textContent = String.fromCharCode(97 + i).toUpperCase();
    } else if (orientation === "row") {
      box.classList.add("row-box");
      box.textContent = i + 1;
    }
    parent.appendChild(box);
  }
}

const displayGrid = (parent) => {
  for(let i = 0; i < 10; i += 1) {
    for(let j = 0; j < 10; j += 1) {
      const box = document.createElement("div");
      box.classList.add("box");
      const xCoor = String.fromCharCode(97 + j).toUpperCase();
      const yCoor = (i + 1).toString();
      box.dataset.coordinate = xCoor + yCoor;
      parent.appendChild(box);
    }
  }
}

const displayShips = (coordinateObj) => {
  const shipCoordinatesObjVal = Object.values(coordinateObj)
  const boxArr = document.querySelectorAll('.player__grid .box')
  boxArr.forEach(box => {
    for(let i = 0; i < shipCoordinatesObjVal.length; i += 1) {
      for(let j = 0; j < shipCoordinatesObjVal[i].length; j += 1) {
        if(box.dataset.coordinate === shipCoordinatesObjVal[i][j]) {
          box.style.backgroundColor = 'var(--sky)'
          if(j === 0) {
            box.style.borderWidth = '2px 1px 2px 2px'
            box.style.borderStyle = 'solid dotted solid solid'
          } else if(j === shipCoordinatesObjVal[i].length - 1) {
            box.style.borderWidth = '2px 2px 2px 1px'
            box.style.borderStyle = 'solid solid solid dotted'
          } else {
            box.style.borderWidth = '2px 1px 2px 1px'
            box.style.borderStyle = 'solid dotted'
          }
        }
      }
    }
  })
}

export{ displayHeader, displayGrid, displayShips }

