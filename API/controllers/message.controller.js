import Message from "../models/Message.model.js";

export const createMessage = async(req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new Message({chatId, senderId, text});

    try{
        const response = await message.save();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err);
    }
}