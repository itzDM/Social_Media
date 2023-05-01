import { catchAsyncError } from "../utils/catchAsyncError.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const getUserById = catchAsyncError(async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("User Not Found");
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error.message);
    }

});

export const getUserFriends = catchAsyncError(async (req, res) => {
    const data = req.user;
    try {

        const currentUser = await User.findById(data.id);
        const followers = await currentUser.followers;
        const followings = await currentUser.followings;
        let friends = followers.concat(...followings);
        friends = [...new Set([...followers, ...followings])];

        return res.status(200).json(friends);

    } catch (error) {
        return res.status(500).json(error.message);

    }

});

export const getProfile = catchAsyncError(async (req, res) => {

    try {
        const user = await User.findOne({ userName: req.body.searchInput });
        if (!user) return res.status(404).json("User Not Found");
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error.message);
    }

});
export const updateProfile = catchAsyncError(async (req, res) => {

    if (req.body.password) {
        try {
            const salt = bcryptjs.genSaltSync(10);
            req.body.password = bcryptjs.hashSync(req.body.password, salt);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
    try {
        const data = req.user;
        const user = await User.findByIdAndUpdate(data.id, {
            $set: req.body,
        });

        return res.status(200).json("User Has been Updated");
    } catch (error) {
        return res.status(500).json(error.message);
    }

});


export const deleteUser = catchAsyncError(async (req, res) => {
    try {
        const data = req.user;
        await User.findByIdAndDelete(data.id);

        return res.status(200).json("User Has been deleted");
    } catch (error) {
        return res.status(500).json(error.message);
    }

});

export const getAllUser = catchAsyncError(async (req, res) => {

    if (req.user.isAdmin) {
        try {

            const user = await User.find().sort({ _id: -1 });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(401).json("You are not Allow");
    }
});