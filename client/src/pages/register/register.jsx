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
  const [err, setErr] = useState (false)

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    console.log(inputs)
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try{
      resetForm();
      await axios.post("http://localhost:8800/api/auth/register", inputs)
    }
    catch(err){
      setErr(true)
    }
  }
  //console.log(err)
  if(err) {
    console.log("hay error")
  }else {
    console.log("no hay errores")
  }

  const resetForm = () => {
    setInputs({
      user_handle: "",
      user_nmrcontrol: "",
      password: "",
      user_carrera: "",
      user_semestre: "",
      first_name: "",
      last_name: ""
    });
  };

  return (
    <>
    <form onSubmit={() => alert("Enviado")}>
      <header>Registrarse a Anonimo</header>
      <p className="Nombre_Usuario">
        Nombre de usuario:
        <input type="text" maxLength={20} placeholder="AredJ" name="user_handle" onChange={handleChange}/>
      </p>
      <p className="No_Control">
        Numero de control:
        <input type="text" maxLength={9} placeholder="231G0168" name="user_nmrcontrol" onChange={handleChange}/>
      </p>
      <p className="Password">
        Contraseña:
        <input type="password" maxLength={200} placeholder="password" name="password" onChange={handleChange}/>
      </p>
      <p className="Carrera">
        Carrera:
        <select name="user_carrera" onChange={handleChange}>
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
      </p>
      <p className="Semestre">
        Semestre:
        <select name="user_semestre" onChange={handleChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </p>
      <p className="Nombre">
        Nombre(s):
        <input type="text" maxLength={15} placeholder="Jared Abisai" name="first_name" onChange={handleChange}/>
      </p>
      <p className="Apellido">
        Apellidos:
        <input type="text" maxLength={20} placeholder="Cantu Rodriguez" name="last_name" onChange={handleChange} />
      </p>
      <button className="Boton" onClick={handleClick}>enviar</button>
    </form>
    </>
  );
};
