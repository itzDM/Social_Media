import { catchAsyncError } from "../utils/catchAsyncError.js";
import Conversation from "../models/conversationModel.js";

export const newConversation = catchAsyncError(async (req, res) => {
    const data = req.user;
    const newConversation = new Conversation({
        members: [data.id, req.body.receiverId]
    });

    try {
        const saveConversation = await newConversation.save();

        return res.status(200).json(saveConversation);

    } catch (error) {
        return res.status(500).json(error.message);

    }


});



export const getConversation = catchAsyncError(async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] }
            });

            return res.status(200).json(conversation);

        } catch (error) {
            return res.status(500).json(error.message);

        }

});