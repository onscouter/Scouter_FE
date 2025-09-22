import { useQuery } from "@tanstack/react-query";
import type { InterviewWithMeta } from "@/types/interview";
import { getInterviewMeta } from "@/features/recruiter/viewCandidate/api";

export const useGetInterviewMeta = (job_interview_public_id: string) =>
  useQuery<InterviewWithMeta>({
    queryKey: ["interviewMeta", job_interview_public_id],
    queryFn: () => getInterviewMeta(job_interview_public_id),
    enabled: !!job_interview_public_id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
