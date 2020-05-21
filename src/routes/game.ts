import express from "express";
import { asyncErrorHandler } from "../middleware/index";
import { listGame, getGame, createGame, editGame, deleteGame } from "../controllers/game";
const router = express.Router();

router.get("/", asyncErrorHandler(listGame));

router.get("/:id", asyncErrorHandler(getGame));

router.post("/", asyncErrorHandler(createGame));

router.put("/:id", asyncErrorHandler(editGame));

router.delete("/:id", asyncErrorHandler(deleteGame));


export default router;