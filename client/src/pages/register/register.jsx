import "./register.scss"

export const Register = () => {
  return (
    <div class="contenedor-formulario">
    <form onSubmit={() => alert("Enviado")}>
      <p>
        Nombre de usuario:
        <input type="text" maxLength={20} placeholder="AredJ" />
      </p>
      <p>
        Numero de control:
        <input type="text" maxLength={9} placeholder="231G0168" />
      </p>
      <p>
        Contraseña:
        <input type="password" maxLength={200} placeholder="password" />
      </p>
      <p>
        Semestre:
        <select name="Semestre">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>+9</option>
        </select>
      </p>
      <p>
        Carrera:
        <select name="carrera">
          <option value={"Sistemas computacionales"}>
            Ing. en Sistemas computacionales
          </option>
          <option value={"Industrial"}>Ing. Industrial</option>
          <option value={"Mecatronica"}>Ing. Mecatronica</option>
          <option value={"Electromecanica"}>Ing. Electromecanica</option>
          <option value={"Administracion"}>Ing. Administracion</option>
          <option value={"Petrolera"}>Ing. Petrolera</option>
          <option value={"Animacion digital y efectos visuales"}>
            Ing. Animacion digital y efectos visuales
          </option>
          <option value={"Quimica"}>Ing. Quimica</option>
          <option value={"Sabatina"}>Modalidad Sabatina</option>
        </select>
      </p>
      <p>
        Nombre(s):
        <input type="text" maxLength={15} placeholder="Jared Abisai" />
      </p>
      <p>
        Apellidos:
        <input type="text" maxLength={20} placeholder="Cantu Rodriguez" />
      </p>
      <input type="submit" value={"enviar"} />
    </form>
    </div>
  );
};
