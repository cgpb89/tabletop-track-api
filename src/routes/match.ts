import express from "express";
import { asyncErrorHandler } from "../middleware/index";
import { listMatch, getMatch, createMatch, editMatch, deleteMatch } from "../controllers/match";
const router = express.Router();

router.get("/", asyncErrorHandler(listMatch));

router.get("/:id", asyncErrorHandler(getMatch));

router.post("/", asyncErrorHandler(createMatch));

router.put("/:id", asyncErrorHandler(editMatch));

router.delete("/:id/:userId", asyncErrorHandler(deleteMatch));


export default router;