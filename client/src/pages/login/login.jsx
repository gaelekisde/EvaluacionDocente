import { useState } from "react";
import "./login.scss"
import axios from "axios";

export const Login = () => {
  //funcionalidad
  const [inputs, setInputs] = useState ({
    user_handle: "",
    password: "",
  })
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/login", inputs);
    } catch (error) {
      setErr(error.response.data || error.message);
    }
  };

  console.log(err);

  return (
    <div className="contenedor-formulario">
    <form onSubmit={() => alert("Enviado")}>
      <p>
        Nombre de usuario:
        <input type="text" maxLength={20} placeholder="AredJ" name="user_handle" onChange={handleChange}/>
      </p>
      <p>
        Contraseña:
        <input type="password" maxLength={200} placeholder="password" name="password" onChange={handleChange}/>
      </p>
      <button onClick={handleClick}>enviar</button>
    </form>
    </div>
  );
};