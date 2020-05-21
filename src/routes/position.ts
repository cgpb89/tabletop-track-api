import express from "express";
import { asyncErrorHandler } from "../middleware/index";
import { listPosition, getPosition, createPosition, editPosition, deletePosition } from "../controllers/position";
const router = express.Router();

router.get("/", asyncErrorHandler(listPosition));

router.get("/:id", asyncErrorHandler(getPosition));

router.post("/", asyncErrorHandler(createPosition));

router.put("/:id", asyncErrorHandler(editPosition));

router.delete("/:id", asyncErrorHandler(deletePosition));


export default router;