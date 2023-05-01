import express from "express";
import { verifyToken } from "../utils/verifyToken.js";

import { getConversation, newConversation } from "../controller/conversationController.js";

const router = express.Router();



router.post("/", verifyToken, newConversation);
router.get("/:userId", verifyToken, getConversation);

export default router;