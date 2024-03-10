import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUserSlice";

const store = configureStore({
  reducer: currentUserReducer,
});

export default store;
