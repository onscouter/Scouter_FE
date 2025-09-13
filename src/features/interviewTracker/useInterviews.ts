import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { InterviewResponse, InterviewFilters } from "@/types/job";
import { fetchInterviews } from "@/features/interviewTracker/api";

export const useInterviews = (filters: InterviewFilters) => {
  return useQuery<InterviewResponse>({
    queryKey: ["interviews", filters],
    queryFn: () => fetchInterviews(filters),
    enabled: !!filters.employee_id,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
