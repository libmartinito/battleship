
// A factory function for the ship object

const Ship = (shipLength, shipName) => {
  // A helper function that creates an array of hit locations
  const setShipHitArr = (length) => {
    const shipHitArr = []
    for(let i = 0; i < length; i += 1) {
      shipHitArr.push('not hit')
    }
    return shipHitArr
  }

  const shipHitArr = setShipHitArr(shipLength)

  const getShipHitArr = () => shipHitArr

  // A function that takes a number and marks the position as hit
  const hit = (hitIndex) => {
    shipHitArr[hitIndex] = 'hit'
  }

  // A function that checks if all of the ship positions are hit
  const isSunk = () => {
    if(shipHitArr.includes('not hit')) {
      return false
    } 
    return true
  }

  return{ shipLength, shipName, hit, isSunk, getShipHitArr }
}

// A factory function for the gameboard object

const Gameboard = () => {
  const ships = []
  const shipCoordinatesObj = {}
  const missedAttacksArr = []
  let shipCounter = 1

  const getShipCoordinatesObj = () => shipCoordinatesObj

  const getShipCoordinatesArr = () => {
    const shipCoordinatesObjValues = Object.values(shipCoordinatesObj)
    const shipCoordinatesArr = [].concat(...shipCoordinatesObjValues)
    return shipCoordinatesArr
  }

  // A function that adds ship coordinates to an array and makes a ship object

  const placeShip = (start, end) => {
    const startX = parseInt(start[0], 36) - 9
    let startY = 0
    const endX = parseInt(end[0], 36) - 9
    let endY = 0

    if(start[2] === undefined) {
      startY = parseInt(start[1], 10)
    } else {
      startY = parseInt(start.substr(start.length - 2), 10)
    }

    if(end[2] === undefined) {
      endY = parseInt(end[1], 10)
    } else {
      endY = parseInt(end.substr(end.length - 2), 10)
    }

    const xLength = endX - startX
    const yLength = endY - startY

    const shipName = `Ship${shipCounter}`
    let shipLength = 0
    const coordinatesArr = []

    if(xLength === 0) {
      shipLength = yLength + 1
      for(let i = 0; i < yLength + 1; i += 1) {
        coordinatesArr.push((startX + 9).toString(36).toUpperCase() + (startY + i).toString())
      }
      shipCoordinatesObj[shipName] = coordinatesArr
    } else {
      shipLength = xLength + 1
      for(let i = 0; i < xLength + 1; i += 1) {
        coordinatesArr.push((startX + i + 9).toString(36).toUpperCase() + (startY).toString())
      }
      shipCoordinatesObj[shipName] = coordinatesArr
    }
    
    const ship = Ship(shipLength, shipName)
    ships.push(ship)
    shipCounter += 1
  }

  // Helper functions for generating a random coordinates

  const getRandomNumber = () => Math.floor(Math.random()*10 + 1)
  const getRandomLetter = () => (getRandomNumber() + 9).toString(36)
  const getRandomCoordinates = () => getRandomLetter().toUpperCase() + getRandomNumber().toString()

  // A helper function that returns all the coordinates between a star and end coordinate (inclusive)

  const generateCoordinates = (start, end) => {
    const xStart = parseInt(start[0], 36) - 9
    let yStart = 0
    const xEnd = parseInt(end[0], 36) - 9
    let yEnd = 0

    if(start[2] === undefined) {
      yStart = parseInt(start[1], 10)
    } else {
      yStart = parseInt(start.substr(start.length - 2), 10)
    }

    if(end[2] === undefined) {
      yEnd = parseInt(end[1], 10)
    } else {
      yEnd = parseInt(end.substr(end.length - 2), 10)
    }

    const xLength = xEnd - xStart
    const yLength = yEnd - yStart

    const coordinatesArr = []

    if(xLength === 0) {
      for(let i =0; i < yLength + 1; i += 1) {
        coordinatesArr.push((xStart + 9).toString(36).toUpperCase() + (yStart + i).toString())
      }
    } else if(yLength === 0) {
      for(let i =0; i < xLength + 1; i += 1) {
        coordinatesArr.push((xStart + i + 9).toString(36).toUpperCase() + (yStart).toString())
      }
    }
    return coordinatesArr
  }

  // A helper function that checks if even one of a series of coordinates will collide
  // with a ship that is already on the board

  const willShipCollide = (coordinates) => {
    const randomShipCoordinates = coordinates
    const shipCoordinatesArr = getShipCoordinatesArr()
    let shipCollisionBool = false
    for(let i = 0; i < randomShipCoordinates.length; i += 1) {
      if(shipCoordinatesArr.includes(randomShipCoordinates[i])) {
        shipCollisionBool = true
      }
    }
    return shipCollisionBool
  }

  // A helper function that returns potential end coordinates with the collisions filtered

  const getFilteredCoordinates = (start, endArr) => {
    const valuesToFilter = []
    for(let i = 0; i < endArr.length; i += 1) {
      const allCoordinates = generateCoordinates(start, endArr[i])
      if(willShipCollide(allCoordinates)) {
        valuesToFilter.push(endArr[i])
      }
    }

    const filteredEndArr = []

    for(let i = 0; i < endArr.length; i += 1) {
      if(!(valuesToFilter.includes(endArr[i]))) {
        filteredEndArr.push(endArr[i])
      }
    }

    return filteredEndArr
  }

  // A function that returns potential end coordinates

  const getRandomEndCoordinates = (start, shipLength) => {

    const xStart = parseInt(start[0], 36) - 9
    let yStart = 0

    if(start[2] === undefined) {
      yStart = parseInt(start[1], 10)
    } else {
      yStart = parseInt(start.substr(start.length - 2), 10)
    }

    const randomEndCoordinates = []

    if(xStart + shipLength < 11) {
      randomEndCoordinates.push((xStart + shipLength + 9).toString(36).toUpperCase() + (yStart).toString())
    }
    if(yStart + shipLength < 11) {
      randomEndCoordinates.push((xStart + 9).toString(36).toUpperCase() + (yStart + shipLength).toString()) 
    }

    return randomEndCoordinates
    
  }

  // A helper function that returns a random index including the min and max values

  const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min + 1)) +  min

  // A helper function that places a ship randomly on the board

  const placeShipRandomly = (length) => {
    let filteredEndArr = []
    let startCoordinates = ''

    while(filteredEndArr.length === 0) {
      const randomStartCoordinates = getRandomCoordinates()
      const randomEndCoordinates = getRandomEndCoordinates(randomStartCoordinates, length)
      const filteredEndCoordinates = getFilteredCoordinates(randomStartCoordinates, randomEndCoordinates)
      startCoordinates = randomStartCoordinates
      filteredEndArr = filteredEndCoordinates
    }
  
    const index = getRandomIndex(0, filteredEndArr.length - 1)

    placeShip(startCoordinates, filteredEndArr[index])
  }

  // A function that fills a board randomly with ships

  const fillBoardRandomly = () => {
    const shipLengthArr = [4,3,2,1]
    for(let i = 0; i < shipLengthArr.length; i += 1) {
      let j = i
      while(j + 1 > 0) {
        placeShipRandomly(shipLengthArr[i])
        j -= 1
      }
    }
  }

  // A helper function that returns the key given a value
  const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key].includes(value))

  // A helper function that calls a hit function on a ship given the ship name
  const hitShip = (shipName, index) => {
    ships.forEach(ship => {
      if(ship.shipName === shipName) {
        ship.hit(index)
      }
    })
  }

  // A function that determines if a ship has been hit, sends the hit function
  // to said ship and collects missed attacks in an array
  const receiveAttack = (coordinates) => {
    const shipCoordinatesArr = getShipCoordinatesArr()
    if(shipCoordinatesArr.includes(coordinates)) {
      const shipAttacked = getKeyByValue(shipCoordinatesObj, coordinates)
      const index = shipCoordinatesObj[shipAttacked].indexOf(coordinates)
      hitShip(shipAttacked, index)
    } else {
      missedAttacksArr.push(coordinates)
    }
  }

  const getShips = () => ships
  const getMissedAttacksArr = () => missedAttacksArr

  // A function that checks if all ships have been sunk

  const areAllShipsSunk = () => {
    let allShipsSunkBool = true
    for(let i = 0; i < ships.length; i += 1) {
      if(ships[i].isSunk() === false) {
        allShipsSunkBool = false
      }
    }
    return allShipsSunkBool
  }

  return { placeShip, fillBoardRandomly, getShipCoordinatesObj, getShipCoordinatesArr, receiveAttack, getShips, getMissedAttacksArr, areAllShipsSunk }
}

// A factory function for the player object

const Player = () => {
  const attack = (board, coordinate) => {
    board.receiveAttack(coordinate)
  }

  const compAttack = (board) => {
    const getRandomNumber = () => Math.floor(Math.random()*10 + 1)
    const getRandomLetter = () => (getRandomNumber() + 9).toString(36)
    const coordinate = getRandomLetter().toUpperCase() + getRandomNumber().toString()
    attack(board, coordinate)
  }

  return { attack, compAttack }
}

const Game = () => {
  const playerBoard = Gameboard()
  const compBoard = Gameboard()
  const player = Player()
  const comp = Player()

  playerBoard.fillBoardRandomly()
  compBoard.fillBoardRandomly()

  const checkWinner = () => {
    if(playerBoard.areAllShipsSunk()) {
      prompt('The computer won.')
    } else if(compBoard.areAllShipsSunk()) {
      prompt('You won!')
    }
  }

  return { playerBoard, compBoard, player, comp, checkWinner }
}

export { Ship, Gameboard, Player, Game }