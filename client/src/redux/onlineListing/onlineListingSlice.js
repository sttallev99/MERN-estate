import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const onlineListingSlice = createSlice({
    name: 'onlineListing',
    initialState,
    reducers: {
        addListing: (state, action) => {
            state.value.push(...action.payload);
        }
    }
});

export const { addListing } = onlineListingSlice.actions;

export default onlineListingSlice.reducer;