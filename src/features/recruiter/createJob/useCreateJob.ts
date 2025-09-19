import { createJob } from "@/features/recruiter/createJob/api";
import { useJobMutate } from "@/features/recruiter/hooks/useJobMutate";

export const useCreateJob = () =>
  useJobMutate({
    mutationFn: createJob,
    onSuccessRedirect: "/recruiter/jobs",
    successMessage: "Job created!",
    errorMessage: "Failed to create job.",
  });
