import express from "express";
const app = express();
import cors from 'cors';
import cookieParser from "cookie-parser";

 
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js"; 
import carrerasRoutes from './routes/carreras.js'
import postsRoutes from "./routes/posts.js"
import commentsRoutes from "./routes/comment.js"
import likeRoutes from "./routes/like.js"
import uploadRoute from "./routes/upload.js"

//middleware para que reciba el jason
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // URL de React
  credentials: true
}));

app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", carrerasRoutes)
app.use("/api", postsRoutes)
app.use("/api", commentsRoutes)
app.use("/api", likeRoutes)
app.use("/api", uploadRoute);

app.use(cookieParser());

import uploadRouter from "./routes/upload.js"; // Adjust the path as needed

app.use('/api', uploadRouter);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));