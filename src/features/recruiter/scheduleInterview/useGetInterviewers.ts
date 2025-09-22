import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchInterviewers } from "@/features/recruiter/scheduleInterview/api";

// For now, we are getting all interviewers to select.
export const useGetInterviewers = (
  job_position_public_id: string,
  job_interview_public_id: string,
  job_application_public_id: string
) => {
  return useQuery({
    queryKey: [
      "getInterviewers",
      {
        job_position_public_id,
        job_interview_public_id,
        job_application_public_id,
      },
    ],
    queryFn: () =>
      fetchInterviewers({
        job_position_public_id,
        job_interview_public_id,
        job_application_public_id,
      }),
    enabled:
      !!job_position_public_id &&
      !!job_interview_public_id &&
      !!job_application_public_id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
