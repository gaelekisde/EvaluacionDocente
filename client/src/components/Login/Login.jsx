import React from 'react'
import "./Login.css"

function Login () {
    return (
        <div className="login-container">
      <form className="login-form">
        <div className="header">
          <img
            className="icon"
            src="https://i.pinimg.com/originals/6b/49/ac/6b49aca23731eb1d2a9ea52a4c5c5ed1.png"
            alt="App Icon"
          />
          <h1>Bienvenido a void</h1>
        </div>
        <div className="form-body">
          <label className="form-label" htmlFor="username">
            Nombre de usuario:
          </label>
          <input className="form-input" type="text" id="username" name="username" />
          <label className="form-label" htmlFor="password">
            Contraseña:
          </label>
          <input className="form-input" type="password" id="password" name="password" />
          <button className="submit-button" type="submit">
            Log in
          </button>
        </div>
      </form>
      <p className="footer-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, officiis delectus eius
        excepturi vitae a at dolore placeat amet maxime commodi dolorem vero numquam, sit sapiente,
        ipsum temporibus quos cum.
      </p>
    </div>
    )
}

export default Login