import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [user_handle, setUserHandle] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        { user_handle, password },
        { withCredentials: true }
      );

      // No es necesario establecer la cookie manualmente aquí
      // La cookie ya debería estar establecida por el servidor
      console.log("Login exitoso", response.data);
      navigate("/posts"); // Redirigir a la página de posts
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Error en el inicio de sesión");
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError(`Error setting up the request: ${err.message}`);
      }
    }
  };

  return (
    <div className="contenedor-general">
      <div className="header-presentacion">
        <img
          className="img-logo"
          src="https://i.pinimg.com/736x/ce/ef/ad/ceefad40d6a85f18ba82b99e08e64257.jpg"
        />
        <h1 className="Login-title">Bienvenido a anonimo</h1>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="contenedor-campo">
          <label>Username:</label>
          <input
            placeholder="denij_bcnhair"
            className="input-text"
            type="text"
            value={user_handle}
            onChange={(e) => setUserHandle(e.target.value)}
            required
          />
        </div>
        <div className="contenedor-campo">
          <label>Contraseña­:</label>
          <input
            placeholder="*****"
            className="input-text"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="contenedor-boton-login">
          <button type="submit">Iniciar</button>
        </div>
      </form>
      <div className="contendor-recovery">
        <Link className="link" to="/#">
          olvidaste tu Contraseña­?
        </Link>
      </div>
      <br></br>
      <div className="contenedor-link-registro">
        <button>
          <Link to="/register">Registrarse</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
