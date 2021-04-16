const player = require("./player");
// const readline = require("readline");
const prompt = require("prompt-sync")();

function readlines(input) {
  return Number(prompt(`${input}: `));
}

function print(player) {
  player.getGrid().map((it) => {
    console.log(it.toString());
  });
}

class gameProcess {
  constructor() {
    this.player1 = new player("player1");
    this.player2 = new player("player2");
    this.curPlayer = 0;
  }

  gameStart() {
    // these are code for edvelopment
    let rotation = false;
    this.player1.addShip(1, 1, 2, rotation);
    this.player1.addShip(2, 2, 2, rotation);
    this.player1.addShip(3, 3, 2, rotation);
    this.player1.addShip(4, 4, 2, rotation);
    this.player1.addShip(5, 5, 2, rotation);

    this.player2.addShip(1, 1, 2, rotation);
    this.player2.addShip(2, 2, 2, rotation);
    this.player2.addShip(3, 3, 2, rotation);
    this.player2.addShip(4, 4, 2, rotation);
    this.player2.addShip(5, 5, 2, rotation);
    // while (this.player1.getshipNum() < 5) {
    //   let type = readlines("p1 type");
    //   let pos_x = readlines("p1 x");
    //   let pos_y = readlines("p1 y");
    //   this.player1.addShip(type, pos_x, pos_y, rotation);

    //   console.log("play1 grid");
    //   print(this.player1);
    // }

    // while (this.player2.getshipNum() < 5) {
    //   let type = readlines("p2 type");
    //   let pos_x = readlines("p2 x");
    //   let pos_y = readlines("p2 y");
    //   this.player2.addShip(type, pos_x, pos_y, rotation);

    //   console.log("play2 grid");
    //   print(this.player2);
    // }

    while (this.isGameEnds() === false) {
      let pos_x = readlines("x");
      let pos_y = readlines("y");
      this.playerMove(pos_x, pos_y);

      if (this.curPlayer == 0) {
        console.log("play2 grid");
        print(this.player2);
      } else {
        console.log("play1 grid");
        print(this.player1);
      }
    }
  }

  isGameEnds() {
    if (this.player1.isLose()) {
      return true;
    }
    if (this.player2.isLose()) {
      return true;
    }

    if (this.player1.isFull() && this.player2.isFull()) {
      return true;
    }

    return false;
  }

  playerMove(pos_x, pos_y) {
    if (this.curPlayer === 1) {
      this.player2.hitbyAnother(pos_x, pos_y);
    } else {
      this.player1.hitbyAnother(pos_x, pos_y);
    }

    this.curPlayer = (this.curPlayer + 1) % 2;
  }
}

module.exports = gameProcess;
