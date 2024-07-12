import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import { userInfo } from "os";
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("File upload failed");
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("No loggeado");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.json(401).json("Token is not valid!");

      const user_handle = userInfo.user_handle;
      const q = "SELECT user_id FROM usuarios WHERE user_handle = ?";

      db.query(q, [user_handle], (err, userResult) => {
        if (err) {
          return res.status(500).json(err);
        }
        const user_id = userResult[0].user_id;

        const query = `UPDATE usuarios SET user_pfp = ? where user_id = ${user_id}`
        db.query(query, [result.url], (err, result) => {
          if (err) return res.status(500).json(err);

          res.status(200).json("se inserto correctamente la imagen");
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
