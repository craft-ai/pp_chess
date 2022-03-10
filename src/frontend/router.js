import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
