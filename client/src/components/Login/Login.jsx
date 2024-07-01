
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user_handle, setUserHandle] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', { user_handle, password }, { withCredentials: true });
      
      // No es necesario establecer la cookie manualmente aquí
      // La cookie ya debería estar establecida por el servidor
      console.log('Login exitoso', response.data);
      navigate('/posts'); // Redirigir a la página de posts
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error en el inicio de sesión');
      } else if (err.request) {
        setError('No response received from the server');
      } else {
        setError(`Error setting up the request: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>User Handle:</label>
          <input 
            type="text" 
            value={user_handle} 
            onChange={(e) => setUserHandle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
