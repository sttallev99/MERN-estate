import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    chats: [],
    selectedChat: null,
    status: 'idle', //idle | loading | succeeded | failed
    error: null
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createAndGetChat.fulfilled, (state, action) => {
                const chat = state.chats.find(c => c._id === action.payload._id);
                if(chat) {
                    state.selectedChat = action.payload;
                    return;
                }
                state.chats = state.chats.concat(action.payload);
                state.selectedChat = action.payload;
            })
    }
});

export const createAndGetChat = createAsyncThunk('chats/createAndGetChat',  async(chatData) => {
    const {firstId, secondId, listingId} = chatData;
    console.log(firstId);
    console.log(secondId);
    console.log(listingId);
    const response = await axios.post('/api/chat', {firstId, secondId, listingId});
    return response.data;
});

export default chatSlice.reducer;