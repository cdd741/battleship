const board = require("./board");
const ship = require("./ship");

class player {
  constructor(playerName) {
    this.playerName = playerName;
    this.board = new board();
    this.boatSettled = 0;
    this.shipList = [];
  }

  getshipNum() {
    return this.boatSettled;
  }

  getGrid() {
    return this.board.getGrid();
  }

  isFull() {
    return this.board.isFull();
  }

  isLose() {
    let i = 0;

    for (i = 0; i < this.shipList.length; i++) {
      if (this.shipList[i].isSank() == false) {
        return false;
      }
    }

    return true;
  }

  hitbyAnother(pos_x, pos_y) {
    let hitcode = 0;
    let ship_index = -1;

    for (let i = 0; i < this.shipList.length; i++) {
      let code = this.shipList[i].hit(pos_x, pos_y);

      if (code > hitcode) {
        hitcode = code;
        ship_index = i;
      }
    }

    if (hitcode === 4) {
      let sankShipPoslList = this.shipList[ship_index].getShip_pos();

      for (let i = 0; i < sankShipPoslList.length; i++) {
        let x = sankShipPoslList[i][0];
        let y = sankShipPoslList[i][1];
        this.board.hit(x, y, hitcode);
      }
    } else {
      this.board.hit(pos_x, pos_y, hitcode);
    }
  }

  addShip(type, pos_x, pos_y, rotation) {
    let ship_pos = [];
    if (rotation == false) {
      if (type == 1) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x, pos_y + 1],
        ];
      } else if (type === 2 || type === 3) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x, pos_y + 1],
          [pos_x, pos_y + 2],
        ];
      } else if (type === 4) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x, pos_y + 1],
          [pos_x, pos_y + 2],
          [pos_x, pos_y + 3],
        ];
      } else if (type === 5) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x, pos_y + 1],
          [pos_x, pos_y + 2],
          [pos_x, pos_y + 3],
          [pos_x, pos_y + 4],
        ];
      }
    } else {
      if (type === 1) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x + 1, pos_y],
        ];
      } else if (type === 2 || type === 3) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x + 1, pos_y],
          [pos_x + 2, pos_y],
        ];
      } else if (type === 4) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x + 1, pos_y],
          [pos_x + 2, pos_y],
          [pos_x + 3, pos_y],
        ];
      } else if (type === 5) {
        ship_pos = [
          [pos_x, pos_y],
          [pos_x + 1, pos_y],
          [pos_x + 2, pos_y],
          [pos_x + 3, pos_y],
          [pos_x + 4, pos_y],
        ];
      }
    }

    let newShip = new ship(ship_pos, type);
    this.shipList.push(newShip);
    this.boatSettled += 1;
    this.board.addShip(newShip);
  }
}

module.exports = player;
