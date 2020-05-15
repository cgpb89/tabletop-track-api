import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Get Games");
});

export default router;