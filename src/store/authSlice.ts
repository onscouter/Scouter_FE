import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import apiClient from "@/api";
import { type Employee } from "@/types/user";
import type { RootState } from "@/store";

interface AuthState {
  user: Employee | null;
  isAuthenticated?: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const fetchBackendUser = createAsyncThunk<
  Employee,
  void,
  { rejectValue: string }
>("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<Employee>("/user/me");
    return res.data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user";
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<Employee | null>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackendUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchBackendUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchBackendUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload ?? "Failed to fetch user";
      });
  },
});

export const { clearUser, setUser } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectCompany = (state: RootState) => state.auth.user?.company;
export const selectPhoneNumber = (state: RootState) =>
  state.auth.user?.phone_number;
export const selectUserError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
