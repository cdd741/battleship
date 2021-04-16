// need import game initialization
const gameProcess = require("./gameProcess");

let io;
let gameSocket;
let gamesInSession = [];
let game;

const initializeGame = (sio, socket) => {
  io = sio;
  gameSocket = socket;
  gamesInSession.push(gameSocket);
  gameSocket.on("disconnect", onDisconnect);

  // gameSocket.on('your turn', )
  gameSocket.on("createNewGame", createNewGame);
  gameSocket.on("playerJoinGame", playerJoinsGame);
};

function createNewGame(gameId) {
  game = new gameProcess(io, gameSocket);
  this.emit("createNewGame", { gameId: gameId, mySocketId: this.id });
  this.join(gameId);
  game.gameStart();
}

function playerJoinsGame(idData) {
  var sock = this;
  var room = io.sockets.adapter.rooms[idData.gameId];

  if (room === undefined) {
    this.emit("status", "This game session does not exist.");
    return;
  }
  if (room.length < 2) {
    idData.mySocketId = sock.id;

    // Join the room
    sock.join(idData.gameId);
    console.log(room.length);

    if (room.length === 2) {
      io.sockets.in(idData.gameId).emit("start game", idData.userName);
    }

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(idData.gameId).emit("playerJoinedRoom", idData);
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("status", "There are already 2 people playing in this room.");
  }
}

function newMove(move) {
  const gameId = move.gameId;
  io.to(gameId).emit("opponent move", move);
}

// function win() {
//     checkWin()
// }

function onDisconnect() {
  let i = gamesInSession.indexOf(gameSocket);
  gamesInSession.splice(i, 1);
}

exports.initializeGame = initializeGame;
exports.io = io;
exports.gameSocket = gameSocket;
