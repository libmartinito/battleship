// A function for displaying the column headers of the grid

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

// A function for displaying the row headers of the grid

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

// A helper function that determines the orientation of the ship

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

// A helper function that hides the ships of the computer board

const hideCompShip = (elem) => {
  if(elem.parentElement.classList.contains('computer__grid')) {
    elem.classList.add('box--hidden')
  }
}

// A function that adds css to specific cells to represent the ship
// as well as hides the ships on the computer board

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

// A function that displays hidden ship cells when attacked

const displayHiddenShip = (target) => {
  target.classList.remove('box--hidden')
}

// A helper function that gets the location of where a ship has been hit

const getShipHitIndex = (arr) => {
  const shipHitIndex = []
  for(let i = 0; i < arr.length; i += 1) {
    if(arr[i] === 'hit') {
      shipHitIndex.push(i)
    }
  }
  return shipHitIndex
}

// A helper function that gets the coordinates of the location where a ship
// has been hit

const getHitCoordinates = (indexArr, coordinatesArr) => {
  const hitCoordinatesArr = []
  for(let i = 0; i < indexArr.length; i += 1) {
    hitCoordinatesArr.push(coordinatesArr[indexArr[i]])
  }
  return hitCoordinatesArr
}

// A function that displays a mark on the screen when hit

const updateHitDisplay = (board, participant) => {
  const ships = board.getShips()
  const allShipCoordinates = Object.values(board.getShipCoordinatesObj())
  const hitCoordinatesArr = []
  const missedAttacks = board.getMissedAttacksArr()
  for(let i = 0; i < ships.length; i += 1) {
    const shipHitArr = ships[i].getShipHitArr()
    const shipHitIndex = getShipHitIndex(shipHitArr)
    console.log(shipHitIndex)
    const shipCoordinates = allShipCoordinates[i]
    console.log(shipCoordinates)
    const shipHitCoordinates = getHitCoordinates(shipHitIndex, shipCoordinates)
    hitCoordinatesArr.push(shipHitCoordinates)
  }
  const hitCoordinates = [].concat(...hitCoordinatesArr)
  let boxes = ''
  if(participant === 'player') {
    boxes = document.querySelectorAll('.player__grid .box')
  } else {
    boxes = document.querySelectorAll('.computer__grid .box')
  }
  boxes.forEach(box => {
    for(let i = 0; i < hitCoordinates.length; i += 1) {
      if(box.dataset.coordinate === hitCoordinates[i]) {
        box.textContent = 'X'
      }
    }
    for(let i = 0; i < missedAttacks.length; i += 1) {
      if(box.dataset.coordinate === missedAttacks[i]) {
        box.textContent = 'X'
      }
    }
  })
}

export{ displayHeader, displayGrid, displayShips, displayHiddenShip, updateHitDisplay }

