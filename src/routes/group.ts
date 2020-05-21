import express from "express";
import { asyncErrorHandler } from "../middleware/index";
import { listGroup, getGroup, createGroup, editGroup, deleteGroup } from "../controllers/group";
const router = express.Router();

router.get("/", asyncErrorHandler(listGroup));

router.get("/:id", asyncErrorHandler(getGroup));

router.post("/", asyncErrorHandler(createGroup));

router.put("/:id", asyncErrorHandler(editGroup));

router.delete("/:id/:userId", asyncErrorHandler(deleteGroup));


export default router;