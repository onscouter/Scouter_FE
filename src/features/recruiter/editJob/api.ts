import apiClient from "@/api";
import type { JobPayload } from "@/types/job";

export const updateJob = async (
  job_position_public_id: string,
  jobData: JobPayload
) => {
  console.log("Updating job with ID:", job_position_public_id);
  console.log("Job data:", jobData);
  const response = await apiClient.put(
    `/job/${job_position_public_id}`,
    jobData
  );
  return response.data;
};

export const getJob = async (job_position_public_id: string) => {
  const response = await apiClient.get(`/job/${job_position_public_id}`);
  return response.data;
};
