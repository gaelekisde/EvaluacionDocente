import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [user_handle, setUserHandle] = useState("");
  const [user_nmrcontrol, setUserNmrControl] = useState("");
  const [password, setPassword] = useState("");
  const [user_carrera, setUserCarrera] = useState("");
  const [user_semestre, setUserSemestre] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        {
          user_handle,
          user_nmrcontrol,
          password,
          user_carrera,
          user_semestre,
          first_name,
          last_name,
        },
        { withCredentials: true }
      );
      console.log("Registro exitoso", response.data);
      navigate("/"); // Redirigir a la página de home
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Error en el registro");
      } else if (err.request) {
        setError("No se recibió respuesta del servidor");
      } else {
        setError(`Error al configurar la solicitud: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <div className="header-title">
        <h1 className="titulo-registro">REGISTRARSE A ANONIMO</h1>
        <img
          className="logo-img"
          src="https://i.pinimg.com/736x/ce/ef/ad/ceefad40d6a85f18ba82b99e08e64257.jpg"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="contenedor-formulario">
        <form onSubmit={handleRegister}>
          <div className="campo-formulario">
            <label>Nombre(s):</label>
            <input
            className="campo-formulario-inputs"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="campo-formulario">
            <label>Apellido:</label>
            <input
            className="campo-formulario-inputs"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="fila-formulario">
            <div className="campo-formulario">
              <label>No. de Ctrl:</label>
              <input
              className="campo-formulario-inputs"
                type="text"
                value={user_nmrcontrol}
                onChange={(e) => setUserNmrControl(e.target.value)}
                required
              />
            </div>
            <div className="campo-formulario">
              <label>Semestre:</label>
              <input className="campo-formulario-inputs"
                type="number"
                value={user_semestre}
                onChange={(e) => setUserSemestre(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="campo-formulario">
            <label>Carrera:</label>
            <select
            className="campo-formulario-inputs"
              name="user_carrera"
              value={user_carrera}
              onChange={(e) => setUserCarrera(e.target.value)}
              required
            >
              <option value="sistemas">
                Ing. en Sistemas computacionales
              </option>
              <option value="industrial">Ing. Industrial</option>
              <option value="mecatronica">Ing. Mecatronica</option>
              <option value="electromecanica">Ing. Electromecanica</option>
              <option value="administracion">Ing. Administracion</option>
              <option value="petrolera">Ing. Petrolera</option>
              <option value="animacion">
                Ing. Animacion digital y efectos visuales
              </option>
              <option value="quimica">Ing. Quimica</option>
              <option value="sabatina">Modalidad Sabatina</option>
            </select>
          </div>
          <div className="campo-formulario">
            <label>Username:</label>
            <input
            className="campo-formulario-inputs"
              type="text"
              value={user_handle}
              onChange={(e) => setUserHandle(e.target.value)}
              required
            />
          </div>
          <div className="campo-formulario">
            <label>Contraseña­</label>
            <input
            className="campo-formulario-inputs"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="contenedor-boton">
          <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
