import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/homepage';
import Game from './pages/game';

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/game" element={<Game />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
