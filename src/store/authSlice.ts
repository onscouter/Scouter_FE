import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Employee } from "@/types/employee";
import type { RootState } from "@/store";

interface AuthState {
  user: Employee | null;
  accessToken: string | null;
  error: string | null;
  hasAttemptedRefresh: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  error: null,
  hasAttemptedRefresh: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.hasAttemptedRefresh = true;
    },
    setUser(
      state,
      action: PayloadAction<{
        user: Employee | null;
        accessToken: string | null;
      }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.hasAttemptedRefresh = true;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
  },
});

export const { clearUser, setUser, setAccessToken } = authSlice.actions;
export const selectHasAttemptedRefresh = (state: RootState) =>
  state.auth.hasAttemptedRefresh;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectCompany = (state: RootState) => state.auth.user?.company;
export const selectPhoneNumber = (state: RootState) =>
  state.auth.user?.phone_number;
export const selectUserError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
