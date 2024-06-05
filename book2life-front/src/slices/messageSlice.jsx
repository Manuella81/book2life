import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      loadConversation: (state, action) => {
        state.messages = action.payload;
      },
    }
})

export const {loadConversation} = messageSlice.actions

export const selectConversation = (state) => state.messages;

export default messageSlice.reducer