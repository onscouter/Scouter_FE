import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface AppState {
  isAppLoading: boolean;
}

const initialState: AppState = {
  isAppLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading(state, action) {
      state.isAppLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;
export const selectAppLoading = (state: RootState) => state.app.isAppLoading;
export default appSlice.reducer;
