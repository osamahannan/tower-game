import './App.css';
import React, { useState } from "react"
import TowerProvider from './TowerProvider';
import ConfigurationPanel from './components/ConfigurationPanel';
import TowerPanel from './components/TowerPanel';

function App() {
  const [gameOver, setGameOver] = useState(false)
  return (
    <TowerProvider>
      <div className="App">
        <div className="panel-container">
          <ConfigurationPanel setGameOver={setGameOver} />
          <TowerPanel gameOver={gameOver} setGameOver={setGameOver} />
        </div>
      </div>
    </TowerProvider>
  );
}

export default App;
