import Chat from '../models/Chat.model.js';
import { errorHandler } from '../utils/error.js';

export const createChat = async (req, res, next) => {
    const {senderId, receiverId} = req.body;

    if(!senderId || !receiverId) return next(errorHandler(500, 'SenderId and receiverId are required!'))

    
    try{
        const chat = await Chat.findOne({members: {$all: [senderId, receiverId]}});
        if(chat) return res.status(200).json(chat);
        
        const newChat = new Chat({members: [senderId, receiverId]});
        
        await newChat.save();
        res.status(200).json('Chat created successfully!')
    }catch(err) {
        res.status(500).json(err);
    }
}

export const getUserChats = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);

    try{
        const chats = await Chat.find({members: { $in: [userId]}});
        res.status(200).json(chats);
    }catch(err) {
        res.status(500).json(err);
    }
}