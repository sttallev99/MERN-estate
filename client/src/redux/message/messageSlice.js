import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    messages: []
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(createMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
        })
    }
});

export const createMessage = createAsyncThunk('message/createMessage', async(messageData) => {
    const { chatId, senderId, text } = messageData;
    const response = await axios.post('/api/message', {chatId, senderId, text});
    return response.data;
});

export const getMessages = createAsyncThunk('message/getMessages', async(chatId) => {
    const response = await axios.get('/api/message/' + chatId);
    return response.data;
})

export default messageSlice.reducer;