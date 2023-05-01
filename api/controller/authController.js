import bcryptjs from "bcryptjs";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";


export const register = catchAsyncError(async (req, res) => {

    try {
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(req.body.password, salt);
        const newUser = new User({
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        const user = await newUser.save();
        const { password, ...info } = user._doc;
        return res.status(200).json(info);

    } catch (error) {
        if (error.code === 11000) return res.status(403).json("User All ready Exits");
        return res.status(500).json(error.message);

    }

});



export const login = catchAsyncError(async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) return res.status(404).json("User Name Or Password Incorrect ");

        const validPass = bcryptjs.compareSync(req.body.password, user.password);

        if (!validPass) return res.status(404).json("User Name Or Password Incorrect");

        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE);
        const accessToken = generateToken(user._id, user.isAdmin);


        const { password, ...info } = user._doc;

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
        }).status(200).json({ ...info, accessToken });

    } catch (error) {
        return res.status(500).json(error.message);
    }


});
