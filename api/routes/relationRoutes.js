import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { follow, followed, unFollow } from "../controller/relationController.js";

const router = express.Router();

router.get("/", verifyToken, followed);
router.put("/", verifyToken, follow);
router.put("/unfollow/", verifyToken, unFollow);

export default router;