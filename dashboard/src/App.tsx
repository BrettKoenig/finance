import React from 'react';
import Data from './data'
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Data name={'expense'} />
      <Data name={'account'} />
      <Data name={'budget'} />
      <Data name={'goal'} />
    </div>
  );
}

export default App;
