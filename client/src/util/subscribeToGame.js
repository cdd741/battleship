import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');
function subscribeToGame() {
  socket.on('/', data=>{});
}
export default subscribeToGame;