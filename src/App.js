import React from 'react';
import Header from './components/Header/Header';
import HomePage from './components/LandingPage/LandingPage';
import GetProjects from './components/STORE/fakerdata'
function App() {
  return (
    <div className="App">
      <Header/>
      <HomePage/>
      <GetProjects/>
    </div>
  );
}

export default App;
