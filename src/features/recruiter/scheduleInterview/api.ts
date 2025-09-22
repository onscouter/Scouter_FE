import apiClient from "@/api";
import type { SuccessResponse } from "@/types/api/success";
import type {
  EmployeeInterviewerFilters,
  EmployeeInterviewerResponse,
} from "@/types/employee";
import type { InterviewWithMeta } from "@/types/interview";

export const fetchInterviewers = async (
  filters: EmployeeInterviewerFilters
): Promise<EmployeeInterviewerResponse> => {
  const params = new URLSearchParams();
  params.append("job_position_public_id", filters.job_position_public_id);
  params.append("job_interview_public_id", filters.job_interview_public_id);
  params.append("job_application_public_id", filters.job_application_public_id);

  try {
    const response = await apiClient.get(
      `/recruiter/get-interviewers?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchInterviewers:", error);
    throw error;
  }
};

export const addInterview = async (
  job_interview_public_id: string,
  employee_public_id: string,
  date_time: string
): Promise<SuccessResponse> => {
  const params = new URLSearchParams();
  params.append("employee_public_id", employee_public_id);
  params.append("date_time", date_time);
  try {
    const response = await apiClient.put(
      `/recruiter/${job_interview_public_id}/add-interviewer?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in addInterview:", error);
    throw error;
  }
};

export const getInterviewMeta = async (
  job_interview_public_id: string
): Promise<InterviewWithMeta> => {
  try {
    const response = await apiClient.get(
      `/interviewer-meta/${job_interview_public_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getInterviewMeta:", error);
    throw error;
  }
};
