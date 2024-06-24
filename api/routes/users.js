import express from "express";
import {getUsers, getUser} from "../controllers/users.js"

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:user_handle', getUser);

export default router;
