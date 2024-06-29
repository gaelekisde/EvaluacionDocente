import express from "express"
import { getPosts, getPost, createPosts, likePost }from "../controllers/posts.js"

const router = express.Router();

router.get('/:carrera/posts', getPosts)
router.get('/:carrera/posts/:opinion_id', getPost)

router.post('/:carrera/posts/crear', createPosts)
router.put('/:carrera/posts/:opinion_id', likePost)

export default router;