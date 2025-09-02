import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchApplications,
  type ApplicationFilter,
  type ApplicationResponse,
} from "./api";

export const useJobCandidate = (filters: ApplicationFilter) => {
  return useQuery<ApplicationResponse>({
    queryKey: ["jobCandidate", filters],
    queryFn: () => fetchApplications(filters),
    enabled: !!filters.public_id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
