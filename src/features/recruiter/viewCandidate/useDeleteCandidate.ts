import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAppLoading } from "@/store/appSlice";
import { deleteCandidate } from "@/features/recruiter/viewCandidate/api";

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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
    onSettled: () => {
      dispatch(setAppLoading(false));
    },
  });
};
