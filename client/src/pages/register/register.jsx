import { useState } from "react";
import "./register.scss"
import axios from "axios";

export const Register = () => {
  //funcionalidad
  const [inputs, setInputs] = useState ({
    user_handle: "",
    user_nmrcontrol: "",
    password: "",
    user_carrera: "",
    user_semestre: "",
    first_name: "",
    last_name: ""
  })
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (error) {
      setErr(error.response.data || error.message);
    }
  };

  console.log(err);

  return (
    <div className="container">
    <form className="Formulario" onSubmit={() => alert("Enviado")}>
      <h1>Registrarse a Anonimo</h1>
      <label>
        Nombre de usuario:
      </label>
      <input type="text" maxLength={20} placeholder="AredJ" name="user_handle" onChange={handleChange}/>
      <label>
        Numero de control:
      </label>
      <input type="text" maxLength={9} placeholder="231G0168" name="user_nmrcontrol" onChange={handleChange}/>
      <label>
        Contraseña:
      </label>
      <input type="password" maxLength={200} placeholder="password" name="password" onChange={handleChange}/>
      <label>
        Carrera:
      </label>
      <select title="Carrera" name="user_carrera" onChange={handleChange}>
          <option value={"Sistemas computacionales"}>
            Ing. en Sistemas computacionales
          </option>
          <option value="Industrial">Ing. Industrial</option>
          <option value="Mecatronica">Ing. Mecatronica</option>
          <option value="Electromecanica">Ing. Electromecanica</option>
          <option value="Administracion">Ing. Administracion</option>
          <option value="Petrolera">Ing. Petrolera</option>
          <option value="Animacion digital y efectos visuales">
            Ing. Animacion digital y efectos visuales
          </option>
          <option value="Quimica">Ing. Quimica</option>
          <option value="Sabatina">Modalidad Sabatina</option>
        </select>
      <label>
        Semestre:
      </label>
      <select title="Semestre" name="user_semestre" onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      <label>
        Nombre(s):
      </label>
      <input type="text" maxLength={15} placeholder="Jared Abisai" name="fi
      rst_name" onChange={handleChange}/>
      <label>
        Apellidos:
      </label>
      <input type="text" maxLength={20} placeholder="Cantu Rodriguez" name="last_name" onChange={handleChange} />
      {err && err}
      <button onClick={handleClick}>enviar</button>
    </form>
    </div>
  );
};
