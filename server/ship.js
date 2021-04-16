class ship {
  constructor(ship_pos, type) {
    this.ship_pos = ship_pos;
    this.hit_pos = [];
    this.type = type;
    // ship_pos is a list like [[1,2] , [2, 3]]
  }

  hit(pos_x, pos_y) {
    for (let i = 0; i < this.hit_pos.length; i++) {
      if (this.hit_pos[i][0] === pos_x && this.hit_pos[i][1] === pos_y) {
        console.error("hit on a previous hit");
        return -1;
      }
    }

    // console.log(`ship pos: ${this.ship_pos}`);
    // console.log(`bomb pos: ${pos_x} ${pos_y}`);
    let boom = false;
    for (let i = 0; i < this.ship_pos.length; i++) {
      if (this.ship_pos[i][0] === pos_x && this.ship_pos[i][1] === pos_y) {
        this.hit_pos.push([pos_x, pos_y]);
        boom = true;
        break;
      }
    }

    if (boom == false) {
      return 2;
    }
    if (this.isSank()) {
      return 4;
    } else if (boom) {
      return 3;
    }
  }

  isSank() {
    return this.hit_pos.length === this.ship_pos.length;
  }

  getShip_pos() {
    return this.ship_pos;
  }
}

module.exports = ship;
