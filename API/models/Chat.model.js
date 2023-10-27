import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: Array,
    listingId: String
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;