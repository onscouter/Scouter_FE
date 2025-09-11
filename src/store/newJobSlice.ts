import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { NewJobState } from "@/types/competency";
import type { RootState } from "@/store";

const initialState: NewJobState = {
  title: "",
  description: "",
};

const newJobSlice = createSlice({
  name: "newJob",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = newJobSlice.actions;

export const selectNewJob = createSelector(
  (state: RootState) => state.newJob,
  (newJob) => ({
    title: newJob.title,
    description: newJob.description,
  })
);
export const selectTitle = (state: RootState) => state.newJob.title;
export const selectDescription = (state: RootState) => state.newJob.description;

export default newJobSlice.reducer;
