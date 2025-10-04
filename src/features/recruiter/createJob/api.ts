import { apiClient, aiApiClient } from "@/api";

import type { SuccessResponse } from "@/types/api/success";
import type {
  JobPayload,
  JobPromptInput,
  SuggestCompetencies,
} from "@/types/job";

export const createJob = async (
  jobData: JobPayload
): Promise<SuccessResponse> => {
  const response = await apiClient.post("/job/new-job", jobData);
  return response.data;
};

export const generateCompetencies = async (
  input: JobPromptInput
): Promise<SuggestCompetencies> => {
  const response = await aiApiClient.post("/job/generate-competencies", input);

  return response.data;
};
