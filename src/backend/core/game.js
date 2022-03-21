const { v4: uuidv4 } = require('uuid');

function createNewGame() {
  const gameId = uuidv4();

  return Promise.resolve(gameId);
}

module.exports = {
  createNewGame,
};
