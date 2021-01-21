import React from 'react';
import cake from './cake.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={cake} className="App-logo" alt="logo" />
        <p>
          Lubię placki.
        </p>
      </header>
    </div>
  );
}

export default App;
