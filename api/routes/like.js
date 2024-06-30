import express from "express";
import  { likePost }from "../controllers/like.js"

const router = express.Router();

router.put('/posts/:opinion_id/like', likePost)

export default router;