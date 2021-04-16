const ship = require("./ship");

class board {
  // const state =  {empty=0 , occupied=1, miss=2 , hit=3, sank=4}
  constructor() {
    let arr = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.grid = arr;
  }

  getGrid() {
    return this.grid;
  }

  isFull() {
    let i;
    let j;

    for (i = 0; i < 10; i++) {
      for (j = 0; j < 10; j++) {
        if (this.grid[i][j] == 0 || this.grid[i][j] == 1) {
          return false;
        }
      }
    }

    return true;
  }

  addShip(newShip) {
    let ship_pos = newShip.getShip_pos();

    let i;
    console.log(ship_pos);
    for (i = 0; i < ship_pos.length; i++) {
      let x = ship_pos[i][0];
      let y = ship_pos[i][1];

      this.grid[x][y] = 1;
    }
  }

  hit(x, y, code) {
    if (code >= this.grid[x][y]) {
      this.grid[x][y] = code;
      return 0;
    } else {
      return -1;
    }
  }
}

module.exports = board;
