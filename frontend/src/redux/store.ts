import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
