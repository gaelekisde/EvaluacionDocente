import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    //CHECK USER IF EXISTS
  
    const q = "SELECT * FROM usuarios WHERE user_handle = ?";
  
    db.query(q, [req.body.user_handle], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
      //CREATE A NEW USER
      //Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO usuarios (`user_handle`, `user_nmrcontrol`, `password`, `user_carrera`, `user_semestre`, `first_name`, `last_name`) VALUES (?)";

      const values = [
        req.body.user_handle,
        req.body.user_nmrcontrol,
        hashedPassword,
        req.body.user_carrera,
        req.body.user_semestre,
        req.body.first_name,
        req.body.last_name
      ];
      
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };

export const login = (req, res) => {

}

export const logout = (req, res) => {

}