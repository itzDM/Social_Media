import express from "express";
import { verifyToken } from "../utils/verifyToken.js";

import { getMessage, newMessage } from "../controller/messageController.js";

const router = express.Router();



router.post("/", verifyToken, newMessage);
router.get("/:id", verifyToken, getMessage);

export default router;