import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadSlice";
import userSlice from "./userSlice";
import shareSlice from "./shareSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
    share: shareSlice,
  },
})
