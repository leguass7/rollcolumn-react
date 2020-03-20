import React from 'react';
import './App.css';

import Home from './pages/Home';

function App() {
  function handleClick(){
    console.log('cliquei')
  }
  return (
    <Home onClick={handleClick} title="Test rollcolumn-react" />
  );
}

export default App;
