import { catchAsyncError } from "../utils/catchAsyncError.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const getComments = catchAsyncError(async (req, res) => {

    try {
        const comment = await Comment.find({ postId: req.params.id }).populate({ path: "userId", select: "name profilePic " }).sort({ _id: -1 });
        return res.status(200).json(comment);

    } catch (error) {
        return res.status(500).json(error.message);

    }


});



export const addComment = catchAsyncError(async (req, res) => {

    try {
            const data = req.user

            const post = await Post.findById(req.params.id);
            const comment = new Comment({
                comment: req.body.comment,
                postId: post._id,
                userId: data.id
            });
            const commentData = await comment.save();

            const cdata = await Post.updateOne({ _id: post._id }, {
                $push: { comments: commentData._id }

            });
            return res.status(200).json(cdata);
        } catch (error) {
            return res.status(500).json(error.message);
        }

});
