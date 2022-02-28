// A factory function for the ship object

const Ship = (shipLength) => {
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

  return{ shipLength, hit, isSunk, getShipHitArr }
}

// A factory function for the gameboard object

const Gameboard = () => {
  const ships = []
  const shipCoordinatesArr = []

  const getShipCoordinatesArr = () => shipCoordinatesArr

  const placeShip = (start, end) => {
    const startX = parseInt(start[0], 36) - 9
    const startY = parseInt(start[1], 10)
    const endX = parseInt(end[0], 36) - 9
    const endY = parseInt(end[1], 10)

    const xLength = endX - startX
    const yLength = endY - startY

    if(xLength === 0) {
      for(let i = 0; i < yLength + 1; i += 1) {
        shipCoordinatesArr.push((startX + 9).toString(36).toUpperCase() + (startY + i).toString())
      }
    } else {
      for(let i = 0; i < xLength + 1; i += 1) {
        shipCoordinatesArr.push((startX + i + 9).toString(36).toUpperCase() + (startY).toString())
      }
    }
    const ship = Ship()
    ships.push(ship)
  }

  return { placeShip, getShipCoordinatesArr }
}

export { Ship, Gameboard }