import React, { useState } from 'react';

import { createGame } from '../../api/chess';

import './game.scss';

function Game() {
  const [gameId, setGameId] = useState(null);

  const createGameId = () => createGame().then((id) => setGameId(id));

  return (
    <div>
      <div>
        <h1>Hello chess gamer</h1>
        <p>Game page</p>
      </div>
      <div>
        <button onClick={createGameId} type="button">
          Create Game
        </button>
      </div>
      <div>
        <p>
          Current game id:
          {`\u00a0${gameId}`}
        </p>
      </div>
    </div>
  );
}

export default Game;
