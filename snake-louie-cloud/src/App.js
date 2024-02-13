import React from 'react';
import './App.css';
import Board from './board';
function App() {
  return (
    <div className="App">
      <body style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Arial, sans-serif"}}>
        <div>
            <h1>Snake Game</h1>
            <hr/>
            <Board/>
        </div>
    </body>
    </div>
  );
}

export default App;
