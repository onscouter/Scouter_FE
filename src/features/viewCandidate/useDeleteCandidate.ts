import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCandidate } from "@/features/viewCandidate/api";

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      candidateId,
    }: {
      jobId: string;
      candidateId: string;
    }) => deleteCandidate(jobId, candidateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCandidate"] });
      toast.success("Candidate deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete candidate");
    },
  });
};
