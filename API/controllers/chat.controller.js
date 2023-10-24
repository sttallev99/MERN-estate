import Chat from '../models/Chat.model.js';
import { errorHandler } from '../utils/error.js';


//create chat
export const createChat = async (req, res, next) => {
    const {firstId, secondId} = req.body;

    if(!firstId || !secondId) return next(errorHandler(500, 'SenderId and receiverId are required!'))

    
    try{
        const chat = await Chat.findOne({members: {$all: [firstId, secondId]}});
        if(chat) return res.status(200).json(chat);
        
        const newChat = new Chat({members: [firstId, secondId]});
        
        await newChat.save();
        res.status(200).json('Chat created successfully!')
    }catch(err) {
        res.status(500).json(err);
    }
}

//get user chats
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

//find chat
export const findChat = async(req, res, next) => {
    const {firstId, secondId} = req.params;

    try{
        const chat = await Chat.findOne({members: { $all: [firstId, secondId]}});
        if(!chat) return next(errorHandler(400, 'chat not found!'));
        res.status(200).json(chat); 
    }catch(err) {
        res.status(500).json(err);
    }
}
