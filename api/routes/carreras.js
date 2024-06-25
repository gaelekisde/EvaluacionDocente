import express from "express";
import {getCarrera} from "../controllers/carreras.js"

const router = express.Router();

router.get('/:carrera', getCarrera)

export default router;