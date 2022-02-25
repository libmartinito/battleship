const Ship = (shipLength, shipName) => {
  
  const createHitLocationArr = (length) => {
    const hitLocationArr = []
    for(let i = 0; i < length; i += 1) {
      hitLocationArr.push('not hit')
    }
    return hitLocationArr
  }

  const hitLocationArr = createHitLocationArr(shipLength)

  const hit = (location) => {
    hitLocationArr[location] = 'hit'
    return hitLocationArr
  }

  const isSunk = () => {
    if(!(hitLocationArr.includes('not hit'))) {
      return true
    }
    return false
  }

  return{ shipLength, shipName, hit, isSunk }
}

const Gameboard = (boardStart, boardEnd) => {
  const ships = []
  const shipCoordinates = {}
  const receivedAttackCoordinates = []

  let shipCounter = 1

  const addToShipCoordinates = (constant, variable, length, orientation, name) => {
    const constantString = (constant + 9).toString(36)

    shipCoordinates[name] = []

    for(let i = 0; i <= length; i += 1) {
      const variableString = (variable + 9 + i).toString(36)
      if(orientation === 'y') {
        shipCoordinates[name].push(constantString.toUpperCase() + variableString)
      } else if (orientation === 'x') {
        shipCoordinates[name].push(variableString.toUpperCase() + constantString)
      }
    }

  }

  const shipName = () => {
    const name = `ship${ shipCounter }`
    shipCounter += 1
    return name
  }

  const placeShip = (start, end) => {
    const xCoordinateStart = parseInt(start[0], 36) - 9
    const xCoordinateEnd = parseInt(end[0], 36) - 9
    const yCoordinateStart = parseInt(start[1], 36) - 9
    const yCoordinateEnd = parseInt(end[1], 36) - 9

    const xLength = xCoordinateEnd - xCoordinateStart
    const yLength = yCoordinateEnd - yCoordinateStart

    const shipInstanceName = shipName()

    let shipLength = 0
    let orientation = ''

    if(xLength === 0) {
      shipLength = yLength
      orientation = 'y'
      addToShipCoordinates(xCoordinateStart, yCoordinateStart, shipLength, orientation, shipInstanceName)
    } else if (yLength === 0) {
      shipLength = xLength
      orientation = 'x'
      addToShipCoordinates(yCoordinateStart, xCoordinateStart, shipLength, orientation, shipInstanceName)
    }

    const ship = Ship(shipLength, shipInstanceName)
    ships.push(ship)

    return ship
  }

  const getNameFromCoordinate = (obj, coordinate) => Object.keys(obj).find(key => obj[key].includes(coordinate))

  const receiveAttack = (coordinates) => {

    const name = getNameFromCoordinate(shipCoordinates, coordinates)
    if (name !== undefined) {
      ships.forEach(ship => {
        if(ship.shipName === name) {
          ship.hit()
        }
      })
    } else {
      receivedAttackCoordinates.push(coordinates)
    }
  }

  const areAllShipsSunk = () => {
    let allShipsSunkBool = true

    ships.forEach(ship => {
      if(!(ship.isSunk())) {
        allShipsSunkBool = false
      }
    })
    return allShipsSunkBool
  }

  return { placeShip, shipCoordinates, receiveAttack, ships, receivedAttackCoordinates, areAllShipsSunk, boardStart, boardEnd }
}

const Player = () => {
  const attackedCoordinates = []

  const attack = (gameboard, coordinates) => {
    gameboard.receiveAttack(coordinates)
    attackedCoordinates.push(coordinates)
  }

  const generateRandomNumber = (min, max) => Math.floor(Math.random()*(max - min + 1) - min)
  const generateRandomLetter = (min, max) => String.fromCharCode(generateRandomNumber(min, max)+97)

  const generateCoordinates = () => {
    const letter = generateRandomLetter(1,10)
    const number = generateRandomNumber(1,10)
    const coordinate = letter.toUpperCase() + number.toString()
    return coordinate
  }

  const randomAttack = (gameboard) => {
    let coordinates = generateCoordinates()
    while(attackedCoordinates.includes(coordinates)) {
      coordinates = generateCoordinates()
    }
    gameboard.receiveAttack(coordinates)
    attackedCoordinates.push(coordinates)
  }

  return { attack, randomAttack }
}

const Game = () => {

}

export { Ship, Gameboard, Player }