import apiClient from "@/api";
import type { InterviewFilters, InterviewResponse } from "@/types/interview";

export const fetchInterviews = async (
  filters: InterviewFilters
): Promise<InterviewResponse> => {
  const params = new URLSearchParams();
  params.append("employee_id", filters.employee_public_id || "");
  params.append("page", String(filters.page ?? 1));
  params.append("limit", String(filters.limit ?? 10));
  if (filters.search) params.append("search", filters.search);
  if (filters.orderBy) params.append("order_by", filters.orderBy);
  if (filters.order) params.append("order", filters.order);

  try {
    const response = await apiClient.get(
      `/interviewer/interviews?${params.toString()}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in fetchInterviews:", error);
    throw error;
  }
};

export const deleteInterviewApi = async (
  interview_id: string
): Promise<void> => {
  try {
    await apiClient.delete(`/interviewer/${interview_id}`);
  } catch (error) {
    console.error("Error in deleteInterviewApi:", error);
    throw error;
  }
};
