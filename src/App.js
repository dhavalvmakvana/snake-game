import React from 'react';
import Board from './components/Board';

const config = {
  matrix: 10,
  blockPositions: [[0,9], [3,4], [5,6], [7,4]]
}

function App() {
  return (
    <div className="App">
      <Board config={config} />
    </div>
  );
}

export default App;
