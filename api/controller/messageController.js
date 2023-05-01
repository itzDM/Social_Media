import { catchAsyncError } from "../utils/catchAsyncError.js";
import Message from "../models/messageModel.js";

export const newMessage = catchAsyncError(async (req, res) => {
    const data = req.user;
    const newMessage = new Message({ sender: data.id, ...req.body });
    try {
        const saveMessage = await newMessage.save();
        return res.status(200).json(saveMessage);

    } catch (error) {
        return res.status(500).json(error.message);

    }
});



export const getMessage = catchAsyncError(async (req, res) => {
        try {
            const message = await Message.find({ conversationId: req.params.id });

            return res.status(200).json(message);

        } catch (error) {
            return res.status(500).json(error.message);

        }

});