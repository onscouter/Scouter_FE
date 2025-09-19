import apiClient from "@/api";
import type { SuccessResponse } from "@/types/api/success";
import type {
  ApplicationFilter,
  ApplicationResponse,
} from "@/types/applicaiton";

export const fetchApplications = async (
  filters: ApplicationFilter
): Promise<ApplicationResponse> => {
  const params = new URLSearchParams();
  params.append("page", String(filters.page ?? 1));
  params.append("limit", String(filters.limit ?? 10));
  if (filters.search) params.append("search", filters.search);
  if (filters.orderBy) params.append("order_by", filters.orderBy);
  if (filters.order) params.append("order", filters.order);
  try {
    const response = await apiClient.get(
      `/recruiter/${filters.job_position_public_id}?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchApplications:", error);
    throw error;
  }
};

export const createCandidate = async (
  data: FormData
): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.post(
      `/recruiter/${data.get("job_position_public_id")}/new-candidate`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error in createCandidate:", error);
    throw error;
  }
};

export const deleteCandidate = async (
  job_position_public_id: string,
  candidate_public_id: string
): Promise<SuccessResponse> => {
  try {
    const response = await apiClient.delete(
      `/recruiter/${job_position_public_id}/${candidate_public_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteCandidate:", error);
    throw error;
  }
};
