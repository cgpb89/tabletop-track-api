import express from "express";
import passport from 'passport';
import { asyncErrorHandler, isUserAdmin } from "../middleware/index";
import { listUser, getUser, createUser, editUser, deleteUser, login, signup } from "../controllers/user";
const router = express.Router();

// When the user sends a post request to this route, passport authenticates the user based on the
// middleware created previously
router.post('/signup', passport.authenticate('signup', { session : false }) , login);

router.post('/login', login);

router.get("/", passport.authenticate('jwt', { session : false }), isUserAdmin,  asyncErrorHandler(listUser));

router.get("/:id", passport.authenticate('jwt', { session : false }), isUserAdmin, asyncErrorHandler(getUser));

router.put("/:id", passport.authenticate('jwt', { session : false }), asyncErrorHandler(editUser));

router.delete("/:id", passport.authenticate('jwt', { session : false }), isUserAdmin, asyncErrorHandler(deleteUser));

export default router;