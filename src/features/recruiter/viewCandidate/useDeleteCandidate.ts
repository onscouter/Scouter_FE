import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCandidate } from "@/features/recruiter/viewCandidate/api";

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      job_position_public_id,
      candidateId,
    }: {
      job_position_public_id: string;
      candidateId: string;
    }) => deleteCandidate(job_position_public_id, candidateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCandidate"] });
      toast.success("Candidate deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete candidate");
    },
  });
};
