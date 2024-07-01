import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user_handle, setUserHandle] = useState('');
  const [user_nmrcontrol, setUserNmrControl] = useState('');
  const [password, setPassword] = useState('');
  const [user_carrera, setUserCarrera] = useState('');
  const [user_semestre, setUserSemestre] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/auth/register', { 
        user_handle, 
        user_nmrcontrol, 
        password, 
        user_carrera, 
        user_semestre,
        first_name, 
        last_name 
      }, { withCredentials: true });
      console.log('Registro exitoso', response.data);
      navigate('/'); // Redirigir a la página de home
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Error en el registro');
      } else if (err.request) {
        setError('No se recibió respuesta del servidor');
      } else {
        setError(`Error al configurar la solicitud: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
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
          <label>Numero de control:</label>
          <input 
            type="text" 
            value={user_nmrcontrol} 
            onChange={(e) => setUserNmrControl(e.target.value)} 
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
        <div>
          <label>Carrera:</label>
          <input 
            type="text" 
            value={user_carrera} 
            onChange={(e) => setUserCarrera(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>semestre:</label>
          <input 
            type="text" 
            value={user_semestre} 
            onChange={(e) => setUserSemestre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={first_name} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input 
            type="text" 
            value={last_name} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
