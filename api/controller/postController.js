import { catchAsyncError } from "../utils/catchAsyncError.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


export const getPosts = catchAsyncError(async (req, res) => {

    try {
        const post = await Post.find({ userId: req.params.id }).sort({ _id: -1 });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error.message);
    }

});


export const getAllPosts = catchAsyncError(async (req, res) => {

    try {
        const post = await Post.find();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error.message);
    }

});


export const getTimelinePosts = catchAsyncError(async (req, res) => {



    const data = req.user;
    if (req.params.id === "undefined") {
        try {
            const currentUser = await User.findById(data.id);
            const userPosts = await Post.find({ userId: data.id }).sort({ _id: -1 });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendsId) => {
                    return Post.find({ userId: friendsId });
                })
            );

            return res.status(200).json(userPosts.concat(...friendPosts));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        try {
            const post = await Post.find({ userId: req.params.id }).sort({ _id: -1 });
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json(error.message);

        }
    }

});


export const addPost = catchAsyncError(async (req, res) => {

    const data = req.user;
    try {

        const newPost = new Post({ userId: data.id, ...req.body });
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch (error) {
        return res.status(500).json(error.message);

    }


});

export const deletePost = catchAsyncError(async (req, res) => {
    const data = req.user;


    const post = await Post.findById(req.params.id);

    if (post.userId === data.id) {
        try {
            await post.deleteOne();
            return res.status(200).json("Post deleted");
        } catch (error) {
            return res.status(500).json(error.message);

        }
    }

    else {
        return res.status(401).json("You are Not Allow Delete this Post");
    }

});


export const updatePost = catchAsyncError(async (req, res) => {

    const data = req.user;


    const post = await Post.findById(req.params.id);

    if (post.userId === data.id) {
        try {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("Post Updated");
        } catch (error) {
            return res.status(500).json(error.message);

        }
    }

    else {
        return res.status(401).json("You are Not Allow Delete this Post");
    }

});

export const likePost = catchAsyncError(async (req, res) => {

    const data = req.user;
    try {
        const post = await Post.findById(req.body.id);
        if (!post.likes.includes(data.id)) {
            await post.updateOne({ $push: { likes: data.id } });
            return res.status(200).json("Post has been likes");
        }
        else {
            await post.updateOne({ $pull: { likes: data.id } });
            return res.status(200).json("Post has been dislikes");
        }
    } catch (error) {
        return res.status(500).json(error.message);

    }





});