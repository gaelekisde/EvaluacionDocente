import express from "express";
const app = express();
 
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

//middleware para que reciba el jason
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);


app.listen(8800, () => {
  console.log("servidor coriendo en el puerto localhost:8800");
});