import express from "express"
import { getPostsistemas }from "../controllers/posts.js"

const router = express.Router();

router.get('/sistemas/:opinion_id', getPostsistemas)
// router.get('/animacion/:opinion_id', getPostanimacion)
// router.get('/electromecanica/:opinion_id', getPostelectromecanica)
// router.get('/industrial/:opinion_id', getPostindustrial)
// router.get('/mecatronica/:opinion_id', getPostmecatronica)
// router.get('/petrolera/:opinion_id', getPostpetrolera)
// router.get('/quimica/:opinion_id', getPostquimica)

export default router;