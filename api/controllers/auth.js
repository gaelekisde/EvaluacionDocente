import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Verificar si el nombre de usuario ya existe
  const q1 = "SELECT * FROM usuarios WHERE user_handle = ?";
  db.query(q1, [req.body.user_handle], (err, data) => {
    if (err) return res.status(500).json(err); 
    if (data.length) return res.status(409).json("Ese nombre de usuario ya está en uso");
    
    // Verificar si el número de control ya existe
    const q2 = "SELECT * FROM usuarios WHERE user_nmrcontrol = ?";
    db.query(q2, [req.body.user_nmrcontrol], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("Ese número de control ya está en uso");
      
      // Crear un nuevo usuario
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      
      const q3 = "INSERT INTO usuarios (`user_handle`, `user_nmrcontrol`, `password`, `user_carrera`, `user_semestre`, `first_name`, `last_name`) VALUES (?)";
      const values = [
        req.body.user_handle,
        req.body.user_nmrcontrol,
        hashedPassword,
        req.body.user_carrera,
        req.body.user_semestre,
        req.body.first_name,
        req.body.last_name
      ];

      db.query(q3, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Usuario registrado exitosamente");
      });
    });
  });
};

export const login = async (req, res) => {
  const q = 'SELECT * FROM usuarios WHERE user_handle = ?';

  db.query(q, [req.body.user_handle], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Usuario no encontrado");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) return res.status(400).json("Contraseña o usuario incorrecto");

    const user = {
      user_handle: data[0].user_handle // Puedes incluir más información si es necesario
    };

    const token = jwt.sign(user, "secretkey");
    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // Cambiar a true si estás usando HTTPS
      sameSite: 'Lax', // Ajusta según tus necesidades: 'Lax', 'Strict', o 'None'
      path: '/',
    })
    .status(200)
    .json(others);
   });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("Sesión cerrada correctamente");
};
