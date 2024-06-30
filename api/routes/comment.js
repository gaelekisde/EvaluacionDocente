import express from "express";
import {getComments, putComment} from "../controllers/comments.js"

const router = express.Router();

router.get('/posts/:opinion_id/comments', getComments)
router.post('/posts/:opinion_id/comment', putComment)

export default router;