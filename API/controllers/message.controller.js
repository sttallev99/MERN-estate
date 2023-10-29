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

export const getMessages = async(req, res) => {
    const { chatId } = req.params;

    try{
        const messages = await Message.find({ chatId });
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json(err);
    }
}