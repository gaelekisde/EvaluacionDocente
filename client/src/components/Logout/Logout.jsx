import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8800/api/auth/logout', null, {
        withCredentials: true, // Asegúrate de incluir esto para enviar cookies con la solicitud
      });
      // Aquí puedes manejar cualquier acción adicional después del logout (como redireccionar a la página de inicio de sesión)
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error al hacer logout:', error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
