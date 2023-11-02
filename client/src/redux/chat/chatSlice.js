import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    chats: null,
    selectedChat: null,
    selectedListing: null,
    status: 'idle', //idle | loading | succeeded | failed
    chatsError: null
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        selectListing: (state, action) => {
            state.selectedListing = action.payload;
        }
    },
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
            .addCase(getUserChats.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
    }
});

export const createAndGetChat = createAsyncThunk('chats/createAndGetChat',  async(chatData) => {
    const {firstId, secondId, listingId} = chatData;
    const response = await axios.post('/api/chat', {firstId, secondId, listingId});
    return response.data;
});

export const getUserChats = createAsyncThunk('chat/getUserChats', async(userId) => {
    const response = await axios.get('/api/chat/' + userId);
    return response.data;
});

export const { selectChat, selectListing } = chatSlice.actions; 

export default chatSlice.reducer;