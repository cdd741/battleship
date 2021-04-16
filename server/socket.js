// need import game initialization
let io;
let gameSocket;
let gamesInSession = [];

const initializeGame = (sio, socket) => {
  io = sio;
  gameSocket = socket;
  gamesInSession.push(gameSocket);
  gameSocket.on("disconnect", onDisconnect);
  gameSocket.on("new move", newMove);
  gameSocket.on("win", win);
  gameSocket.on("createNewGame", createNewGame);
};

function createNewGame(gameId) {
  this.emit("createNewGame", { gameId: gameId, mySocketId: this.id });
  this.join(gameId);
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
