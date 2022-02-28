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

export { Ship }