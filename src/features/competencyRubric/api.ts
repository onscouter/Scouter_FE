import apiClient from "@/api";
import type { Rubric } from "@/types/rubric"; // update path as needed

export const saveAllRubrics = async (payload: {
  jobId: string;
  rubrics: Rubric[];
}) => {
  const response = await apiClient.put(
    `/api/rubrics/batch/${payload.jobId}`,
    payload.rubrics
  );
  return response.data;
};
