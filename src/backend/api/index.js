const express = require('express');

const { createNewGame } = require('../core/game');
const { movePiece } = require('../core/movement');

const router = express.Router({ mergeParams: true });

// Full route: api/game
router.post('/game').post((req, res, next) => {
  createNewGame()
    .then((gameId) => {
      res.send(gameId);
    })
    .catch(next);
});

// Full route: api/move/:game_id
router.post('/move/:game_id').post((req, res, next) => {
  const { game_id: gameId } = req.params;
  const { movement } = req.body;

  movePiece(gameId, movement)
    .then((result) => {
      res.send(result);
    })
    .catch(next);
});

module.exports = router;
