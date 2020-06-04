import express from "express";
import { asyncErrorHandler } from "../middleware/index";
import { listGames, associateGame } from "../controllers/userGames";
const router = express.Router();

router.get("/", asyncErrorHandler(listGames));

router.post("/", asyncErrorHandler(associateGame));


export default router;