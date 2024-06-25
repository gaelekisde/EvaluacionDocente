import express from "express"
import { getPosts, getPost }from "../controllers/posts.js"

const router = express.Router();

// router.get('/sistemas/posts/', getPostsdesistemas)
router.get('/:carrera/posts', getPosts)
router.get('/:carrera/posts/:opinion_id', getPost)

export default router;