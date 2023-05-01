import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUser, getAllUser, getProfile, getUserById, getUserFriends, updateProfile } from "../controller/userController.js";

const router = express.Router();

router.post("/", verifyToken, getProfile);
router.get("/users", verifyToken, getAllUser);
router.get("/friends", verifyToken, getUserFriends);
router.get("/:id", verifyToken, getUserById);
router.put("/", verifyToken, updateProfile);
router.delete("/", verifyToken, deleteUser);

export default router;