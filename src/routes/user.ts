import express from "express";
import { asyncErrorHandler } from "../middleware/index";
import { listUser, getUser, createUser, editUser, deleteUser } from "../controllers/user";
const router = express.Router();

router.get("/", asyncErrorHandler(listUser));

router.get("/:id", asyncErrorHandler(getUser));

router.post("/", asyncErrorHandler(createUser));

router.put("/:id", asyncErrorHandler(editUser));

router.delete("/:id", asyncErrorHandler(deleteUser));


export default router;