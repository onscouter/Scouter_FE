import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/store/appSlice";
import authReducer from "@/store/authSlice";
import rubricSlice from "@/store/rubricSlice";
import newJobSlice from "./newJobSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    rubric: rubricSlice,
    newJob: newJobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
