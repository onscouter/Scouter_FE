import apiClient from "@/api";
import type { SuccessResponse } from "@/types/api/success";
import type { JobPayload } from "@/types/job";

export const createJob = async (
  jobData: JobPayload
): Promise<SuccessResponse> => {
  const response = await apiClient.post("/job/new-job", jobData);
  return response.data;
};
