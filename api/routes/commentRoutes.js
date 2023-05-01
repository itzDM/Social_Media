import express from "express";
import { verifyToken } from "../utils/verifyToken.js";

import { addComment, getComments } from "../controller/commentController.js";

const router = express.Router();

router.get("/:id", verifyToken, getComments);
router.post("/:id", verifyToken, addComment);

export default router;