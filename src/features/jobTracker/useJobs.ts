import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchJobs } from "@/features/jobTracker/api";
import type { JobFilters, JobsResponse } from "@/types/job";

export const useJobs = (filters: JobFilters) => {
  return useQuery<JobsResponse>({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
    enabled: !!filters.company_id,
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
