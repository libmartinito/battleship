import { Ship, Gameboard } from "./app"

describe('hit', () => {
  const ship = Ship(1)
  ship.hit(1)
  const expected = ['not hit', 'hit']
  it('modifies hit array with an updated hit location', () => {
    expect(ship.getShipHitArr()).toEqual(expected)
  })
})

describe('isSunk', () => {
  const ship = Ship(1)
  it('returns false when not hit', () => {
    expect(ship.isSunk()).toBeFalsy();
  })
  it('returns true when all locations are hit', () => {
    ship.hit(0)
    ship.hit(1)
    expect(ship.isSunk()).toBeTruthy();
  })
})

describe('placeShip', () => {
  it('returns a ship object given coordinates in vertical orientation', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A3')
    const arr = gameboard.getShipCoordinatesArr()
    const expected = {'Ship1': ['A1', 'A2', 'A3']}
    expect(arr).toEqual(expected)
  });
  it('returns a ship object given coordinates in horizontal orientation', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'C1')
    const arr = gameboard.getShipCoordinatesArr()
    const expected = {'Ship1': ['A1', 'B1', 'C1']}
    expect(arr).toEqual(expected)
  });
});
/*
describe('receiveAttack', () => {
  it('sinks a ship when attacks are received for all coordinates of the ship', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A3')
    gameboard.receiveAttack('A1')
    gameboard.receiveAttack('A2')
    expect(gameboard.ships[0].isSunk()).toBeTruthy
  })
  it('does not sink a ship when attacks are not received for all coordinates of a ship', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A3')
    gameboard.receiveAttack('A1')
    expect(gameboard.ships[0].isSunk()).toBeFalsy
  })
  it('adds the coordinate attacked that did not hit a ship to an array', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A3')
    gameboard.receiveAttack('A4')
    const expected = ['A4']
    expect(gameboard.receivedAttackCoordinates).toEqual(expected)
  })
})

describe('areAllShipsSunk', () => {
  it('returns true if all ships are sunk', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A2')
    gameboard.placeShip('B1', 'B2')
    gameboard.receiveAttack('A1')
    gameboard.receiveAttack('A2')
    gameboard.receiveAttack('B1')
    gameboard.receiveAttack('B2')
    expect(gameboard.areAllShipsSunk()).toBeTruthy
  })
  it('returns false if all ships are not sunk', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A2')
    gameboard.placeShip('B1', 'B2')
    gameboard.receiveAttack('A1')
    gameboard.receiveAttack('A2')
    expect(gameboard.areAllShipsSunk()).toBeFalsy
  })
})

describe('fillboard', () => {
  it('fills a board with ships randomly', () => {
    const gameboard = Gameboard()
    gameboard.fillBoard()
    expect(gameboard.ships).not.toBeNull
  })
})

describe('attack', () => {
  it('attacks a coordinate on a gameboard', () => {
    const gameboard = Gameboard()
    gameboard.placeShip('A1', 'A2')
    const player = Player()
    player.attack(gameboard, 'A1')
    player.attack(gameboard, 'A2')
    expect(gameboard.areAllShipsSunk()).toBeTruthy
  })
})
*/