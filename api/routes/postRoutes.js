import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { updatePost, deletePost, addPost, getPosts, likePost, getAllPosts, getTimelinePosts } from "../controller/postController.js";

const router = express.Router();

router.get("/:id", verifyToken, getPosts);
router.get("/", verifyToken, getAllPosts);
router.get("/timeline/all/:id", verifyToken, getTimelinePosts);
router.post("/", verifyToken, addPost);
router.put("/like", verifyToken, likePost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;