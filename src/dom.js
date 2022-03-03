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

const getShipOrientation = (coordinates) => {
  let orientation = ''
  const xStartOne = coordinates[0][0]
  const xStartTwo = coordinates[1][0]
  if(xStartOne === xStartTwo) {
    orientation = 'ver'
  }else {
    orientation = 'hor'
  }
  return orientation
}

const hideCompShip = (elem) => {
  if(elem.parentElement.classList.contains('computer__grid')) {
    elem.classList.add('box--hidden')
  }
}

const displayShips = (coordinateObj, participant) => {
  const shipCoordinatesObjVal = Object.values(coordinateObj)
  let boxArr = ''
  if(participant === 'player') {
    boxArr = document.querySelectorAll('.player__grid .box')
  } else {
    boxArr = document.querySelectorAll('.computer__grid .box')
  }
  boxArr.forEach(box => {
    for(let i = 0; i < shipCoordinatesObjVal.length; i += 1) {
      const orientation = getShipOrientation(shipCoordinatesObjVal[i])
      for(let j = 0; j < shipCoordinatesObjVal[i].length; j += 1) {
        if(box.dataset.coordinate === shipCoordinatesObjVal[i][j]) {
          box.classList.add('box--ship')
          if(j === 0) {
            box.classList.add(`box--start-${orientation}`)
            hideCompShip(box)
          } else if(j === shipCoordinatesObjVal[i].length - 1) {
            box.classList.add(`box--end-${orientation}`)
            hideCompShip(box)
          } else {
            box.classList.add(`box--mid-${orientation}`)
            hideCompShip(box)
          }
        }
      }
    }
  })
}

const displayHiddenShip = (target) => {
  target.classList.remove('box--hidden')
}

export{ displayHeader, displayGrid, displayShips, displayHiddenShip }

