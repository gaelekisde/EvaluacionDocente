import React from "react";
import './Nav.css'

const Nav = () => {

    return(
        <div className="contenedor-principal">
            <div className="contenedor-titulo">
            </div>
            <div className="Contenedor-menu">
                <ul>
                    <li>
                        <select name="carrera">
                            <option value={"Sistemas computacionales"}>Ing. en Sistemas computacionales</option>
                            <option value={"Industrial"}>Ing. Industrial</option>
                            <option value={"Mecatronica"}>Ing. Mecatronica</option>
                            <option value={"Electromecanica"}>Ing. Electromecanica</option>
                            <option value={"Administracion"}>Ing. Administracion</option>
                            <option value={"Petrolera"}>Ing. Petrolera</option>
                            <option value={"Animacion digital y efectos visuales"}>Ing. Animacion digital y efectos visuales</option>
                            <option value={"Quimica"}>Ing. Quimica</option>
                        </select>
                    </li>
                    <li>text2</li>
                    <li>text3</li>
                </ul>
            </div>
        </div>
    )
}

export default Nav