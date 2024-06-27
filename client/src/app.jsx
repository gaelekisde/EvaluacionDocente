import React from 'react';
import Login from './components/Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts/Posts';


function App() {
  return (
<div className="App">
      <header className="App-header">
        <h1>Posts App</h1>
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;