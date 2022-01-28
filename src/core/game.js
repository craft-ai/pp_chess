const { v4: uuidv4 } = require('uuid');

function createNewGame() {
  const gameId = uuidv4();


  return gameId;
}

module.exports = {
  createNewGame,
};
