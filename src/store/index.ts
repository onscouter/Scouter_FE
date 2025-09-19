import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/store/appSlice";
import authReducer from "@/store/authSlice";
import newJobSlice from "@/store/newJobSlice";
import newCompetencySlice from "@/store/newCompetencySlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    newJob: newJobSlice,
    competencies: newCompetencySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
