import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        addSocket: (state, action) => {
            state.value = action.payload;
        },
        removeToken: state => {
            state.value = null;
        }
    }
});

export const { addSocket, removeToken } = socketSlice.actions;
export default socketSlice.reducer;