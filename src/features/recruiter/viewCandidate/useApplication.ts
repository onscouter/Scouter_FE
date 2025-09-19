import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchApplications } from "@/features/recruiter/viewCandidate/api";
import type {
  ApplicationFilter,
  ApplicationResponse,
} from "@/types/applicaiton";

export const useJobCandidate = (filters: ApplicationFilter) => {
  return useQuery<ApplicationResponse>({
    queryKey: ["jobCandidate", filters],
    queryFn: () => fetchApplications(filters),
    enabled: !!filters.job_position_public_id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
