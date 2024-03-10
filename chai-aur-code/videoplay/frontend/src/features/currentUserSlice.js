import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    addCurrentUserData: (state, action) => {
      state.currentUser = action.payload;
    },
    removeCurrentUserData: (state) => {
      state.currentUser = {};
    },
  },
});

export const { addCurrentUserData, removeCurrentUserData } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;
