import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Posts from './components/Posts/Posts'; 
import Register from './components/Register/Register';
import User from './components/Profile/User' ;
import Nav from './components/Nav/Nav'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts/:carrera" element={<Posts />} />
        <Route path="/posts/" element={<Posts />} />
        <Route path="/user/:user" element={<User />} />
        <Route path="/register" element = {<Register />} />
      </Routes>
    </Router>


  );
};

export default App