import express from "express"
import { getPosts, getPost, createPosts, getAllPosts }from "../controllers/posts.js"

const router = express.Router();

router.get('/general/posts', getAllPosts)
router.get('/:carrera/posts', getPosts)
router.get('/posts/:opinion_id', getPost)

router.post('/:carrera/posts/crear', createPosts)

export default router;