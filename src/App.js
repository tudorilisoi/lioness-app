import React from 'react';
import Header from './components/Header/Header';
import HomePage from './components/LandingPage/LandingPage';
import DataLoader from './components/DataLoader/DataLoader'
function App() {
  return (
    <div className="App">
      <Header/>
      <HomePage/>
    <DataLoader/>
    </div>
  );
}

export default App;
