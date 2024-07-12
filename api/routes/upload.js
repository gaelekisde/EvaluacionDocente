// import multer from "multer";
// import express from "express";
// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const upload = multer({ dest: "uploads" });

// const router = express.Router();

// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       throw new Error("File upload failed");
//     }

//     console.log(req.file); // Log the file details

//     const result = await cloudinary.uploader.upload(req.file.path);
//     // Delete the local file after uploading to Cloudinary
//     fs.unlinkSync(req.file.path);
//     res.status(200).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;

import express from "express";
import { uploadImage } from "../controllers/upload.js";

const router = express.Router();
import { upload } from '../controllers/upload.js';

router.post("/upload", upload.single("image"), uploadImage);

export default router;