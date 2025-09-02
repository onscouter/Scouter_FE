import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Competency, NewJobState } from "@/types/competency";
import { mockCompetencies } from "@/features/createRole/mockCompetencies";
import type { RootState } from "@/store";

const initialState: NewJobState = {
  title: "",
  description: "",
  suggested: mockCompetencies,
  selected: [],
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
    setSuggestedCompetencies(state, action: PayloadAction<Competency[]>) {
      state.suggested = action.payload;
    },
    addSelectedCompetency(state, action: PayloadAction<Competency>) {
      if (!state.selected.some((c) => c.id === action.payload.id)) {
        state.selected.push(action.payload);
      }
    },
    removeSelectedCompetency(state, action: PayloadAction<Competency>) {
      state.selected = state.selected.filter((c) => c.id !== action.payload.id);
    },
    toggleSelectedCompetency(state, action: PayloadAction<Competency>) {
      const exists = state.selected.some((c) => c.id === action.payload.id);

      if (exists) {
        state.selected = state.selected.filter(
          (c) => c.id !== action.payload.id
        );
      } else {
        state.selected.push(action.payload);
      }
    },
    clearSelectedCompetencies(state) {
      state.selected = [];
    },
  },
});

export const {
  setSuggestedCompetencies,
  toggleSelectedCompetency,
  clearSelectedCompetencies,
  addSelectedCompetency,
  removeSelectedCompetency,
  setTitle,
  setDescription,
} = newJobSlice.actions;

export const selectTitle = (state: RootState) => state.newJob.title;
export const selectDescription = (state: RootState) => state.newJob.description;
export const selectSuggestedCompetencies = (state: RootState) =>
  state.newJob.suggested;
export const selectSelectedCompetencies = (state: RootState) =>
  state.newJob.selected;

export default newJobSlice.reducer;
