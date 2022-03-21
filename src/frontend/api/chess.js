import axios from 'axios';

function createGame() {
  return axios.post('http://localhost:3000/api/game').then((response) => response.data);
}

function movePiece(gameId, movement) {
  return axios
    .post(`http://localhost:3000/api/move/${gameId}`, { data: { movement } })
    .then((response) => response.data);
}

export { createGame, movePiece };
