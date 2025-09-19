import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/features/recruiter/editJob/api";

export const useGetJob = (job_position_public_id: string) => {
  return useQuery({
    queryKey: ["job_position_public_id", job_position_public_id],
    queryFn: () => getJob(job_position_public_id),
    enabled: !!job_position_public_id,
    staleTime: 1000 * 60 * 5,
  });
};
