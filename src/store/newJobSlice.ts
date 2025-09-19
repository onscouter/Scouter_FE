import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { JobMinimal } from "@/types/job";

const initialState: JobMinimal = {
  title: "",
  description: "",
  job_position_public_id: crypto.randomUUID(),
  status: "ACTIVE",
};

const newJobSlice = createSlice({
  name: "newJob",
  initialState,
  reducers: {
    setJob(state, action: PayloadAction<JobMinimal>) {
      const job = action.payload;

      state.title = job.title;
      state.description = job.description;
      state.job_position_public_id = job.job_position_public_id;
      state.status = job.status;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },

    clearJob(state) {
      state.title = "";
      state.description = "";
      state.job_position_public_id = crypto.randomUUID();
      state.status = "ACTIVE";
    },
  },
});

export const { setTitle, setDescription, setJob, clearJob } =
  newJobSlice.actions;

export const selectNewJob = (state: RootState) => state.newJob;
export const selectTitle = (state: RootState) => state.newJob.title;
export const selectDescription = (state: RootState) => state.newJob.description;
export const selectJobPositionPublicId = (state: RootState) =>
  state.newJob.job_position_public_id;
export const selectStatus = (state: RootState) => state.newJob.status;

export default newJobSlice.reducer;
