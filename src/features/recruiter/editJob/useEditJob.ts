import { updateJob } from "@/features/recruiter/editJob/api";
import { useJobMutate } from "@/features/recruiter/hooks/useJobMutate";
import type { JobPayload } from "@/types/job";

export const useUpdateJob = (job_position_public_id: string) =>
  useJobMutate({
    mutationFn: (data: JobPayload) => updateJob(job_position_public_id, data),
    onSuccessRedirect: "/recruiter/jobs",
    successMessage: "Job updated!",
    errorMessage: "Failed to update job.",
  });
