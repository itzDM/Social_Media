import { catchAsyncError } from "../utils/catchAsyncError.js";
import User from "../models/userModel.js";

export const followed = catchAsyncError(async (req, res) => {

    const data = req.user;
    try {
        const user = await User.findById(data.id);
        if (user.followings.includes(req.params.id)) {
            return res.status(200).json();
        }
        else {
            res.status(403).json("Your are Not follow ");
        }

    } catch (error) {
        console.log(error.message);
    }


});


export const unFollow = catchAsyncError(async (req, res) => {

    const data = req.user;
    if (req.body.userId !== data.id) {
        try {
            const user = await User.findById(data.id);
            const followUser = await User.findById(req.body.userId);
            if (user.followings.includes(req.body.userId)) {
                await followUser.updateOne({ $pull: { followers: data.id } });
                await user.updateOne({ $pull: { followings: req.body.userId } });
                res.status(200).json("User Has been UnFollowed");
            }
            else {
                res.status(403).json("Your are Not follow ");
            }

        } catch (error) {
            return res.status(500).json(error.message);

        }
    } else {
        return res.status(403).json("You Cant not UnFollow YourSelf");
    }

});


export const follow = catchAsyncError(async (req, res) => {

    const data = req.user;

    if (req.body.userId !== data.id) {
        try {
            const user = await User.findById(data.id);
            const followUser = await User.findById(req.body.userId);
            if (!user.followings.includes(req.body.userId)) {
                await followUser.updateOne({ $push: { followers: data.id } });
                await user.updateOne({ $push: { followings: req.body.userId } });
                res.status(200).json("User Has been Followed");
            }
            else {
                res.status(403).json("Already follow ");
            }

        } catch (error) {
            return res.status(500).json(error.message);

        }
    } else {
        return res.status(403).json("You Cant not Follow YourSelf");
    }

}); 