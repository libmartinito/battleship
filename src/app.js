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

  const getShipCoordinatesArr = () => shipCoordinatesObj

  // A function that adds ship coordinates to an array and makes a ship object
  const placeShip = (start, end) => {
    const startX = parseInt(start[0], 36) - 9
    const startY = parseInt(start[1], 10)
    const endX = parseInt(end[0], 36) - 9
    const endY = parseInt(end[1], 10)

    const xLength = endX - startX
    const yLength = endY - startY

    const shipName = `Ship${shipCounter}`
    let shipLength = 0
    const coordinatesArr = []

    if(xLength === 0) {
      shipLength = yLength
      for(let i = 0; i < yLength + 1; i += 1) {
        coordinatesArr.push((startX + 9).toString(36).toUpperCase() + (startY + i).toString())
      }
      shipCoordinatesObj[shipName] = coordinatesArr
    } else {
      shipLength = xLength
      for(let i = 0; i < xLength + 1; i += 1) {
        coordinatesArr.push((startX + i + 9).toString(36).toUpperCase() + (startY).toString())
      }
      shipCoordinatesObj[shipName] = coordinatesArr
    }
    
    const ship = Ship(shipLength, shipName)
    ships.push(ship)
    shipCounter += 1
  }

  // A helper function that returns the key given a value
  const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key].includes(value))

  // A helper function that calls a hit function on a ship given the ship name
  const hitShip = (shipName) => {
    ships.forEach(ship => {
      if(ship.shipName === shipName) {
        ship.hit()
      }
    })
  }

  // A function that determines if a ship has been hit, sends the hit function
  // to said ship and collects missed attacks in an array
  const receiveAttack = (coordinates) => {
    const shipCoordinatesObjValues = Object.values(shipCoordinatesObj)
    const shipCoordinatesArr = [].concat(...shipCoordinatesObjValues)
    if(shipCoordinatesArr.includes(coordinates)) {
      const shipAttacked = getKeyByValue(coordinates)
      hitShip(shipAttacked)
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

  return { placeShip, getShipCoordinatesArr, receiveAttack, getShips, getMissedAttacksArr, areAllShipsSunk }
}

export { Ship, Gameboard }