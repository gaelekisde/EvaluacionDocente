import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Posts from './components/Posts/Posts'; 
import Register from './components/Register/Register';
import User from './components/Profile/User' ;


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts/:carrera" element={<Posts />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/user/:user" element={<User />} /> {/* Adjusted the route path */}
      </Routes>
    </Router>
  );
};

export default App