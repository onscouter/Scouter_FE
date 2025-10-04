import { apiClient } from "@/api";
import type { SuccessResponse } from "@/types/api/success";
import type { JobFilters, JobsResponse } from "@/types/job";

export const fetchJobs = async (filters: JobFilters): Promise<JobsResponse> => {
  const params = new URLSearchParams();
  params.append("company_public_id", filters.company_public_id || "");
  params.append("page", String(filters.page ?? 1));
  params.append("limit", String(filters.limit ?? 10));
  if (filters.job_status) params.append("job_status", filters.job_status);
  if (filters.search) params.append("search", filters.search);
  if (filters.orderBy) params.append("order_by", filters.orderBy);
  if (filters.order) params.append("order", filters.order);

  try {
    const response = await apiClient.get(
      `/recruiter/jobs?${params.toString()}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetchJobs:", error);
    throw error;
  }
};

export const deleteJobApi = async (
  job_id: string
): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.delete(`/recruiter/${job_id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteJobApi:", error);
    throw error;
  }
};
