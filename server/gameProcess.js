const player = require("./player");
const socket = require("./socket");
const gameSocket = socket.gameSocket;
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
  constructor(io, gameSocket) {
    this.io = io;
    this.gameSocket = gameSocket;
    this.player1 = new player("player1");
    this.player2 = new player("player2");
    this.curPlayer = 0;
    this.gameSocket.emit("grid", (id) => {
      if (id === this.player1.id) {
        this.gameSocket.emit("your grid", this.player1.board);
        this.gameSocket.emit("the other grid", this.player2.board);
      } else {
        this.gameSocket.emit("your grid", this.player2.board);
        this.gameSocket.emit("the other grid", this.player1.board);
      }
    });

    this.gameSocket.on("attack", (attackPos) => {
      let pos_x;
      let pos_y;
      pos_x = attackPos.x;
      pos_y = attackPos.y;

      if (this.curPlayer == 0) {
        // let pos_x = readlines("x");
        // let pos_y = readlines("y");
        this.playerMove(pos_x, pos_y);
        console.log("play2 grid");
        print(this.player2);
        this.gameSocket.emit("attack", this.player2.id);
      } else {
        // let pos_x = readlines("x");
        // let pos_y = readlines("y");
        this.playerMove(pos_x, pos_y);
        console.log("play1 grid");
        print(this.player1);
        this.gameSocket.emit("attack", this.player1.id);
      }
      if (this.isGameEnds() !== "no") {
        this.gameSocket.emit("win", this.isGameEnds());
      }
    });

    gameSocket.on("place ship", (ship) => {
      let type = ship.type;
      let pos_x = ship.x;
      let pos_y = ship.y;
      let rotation = ship.rotation;
      if (ship.id === this.player1.id) {
        this.player1.addShip(type, pos_x, pos_y, rotation);
      } else {
        this.player2.addShip(type, pos_x, pos_y, rotation);
      }

      if (
        this.player1.shipList.length === 5 &&
        this.player1.shipList.length === 5
      ) {
        gameSocket.emit("start", "game start");
      }
    });
  }

  assignPlayerId = (id) => {
    if (this.player1.id === "") {
      this.player1.id = id;
    } else {
      this.player2.id = id;
    }
  };

  isGameEnds() {
    if (this.player1.isLose()) {
      return "p1";
    } else if (this.player2.isLose()) {
      return "p2";
    } else if (this.player1.isFull() && this.player2.isFull()) {
      return "full";
    } else {
      return "no";
    }
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
