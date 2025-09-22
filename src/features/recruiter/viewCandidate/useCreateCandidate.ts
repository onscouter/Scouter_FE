import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAppLoading } from "@/store/appSlice";
import { toast } from "react-toastify";
import { createCandidate } from "@/features/recruiter/viewCandidate/api";

export const useCreateCandidate = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCandidate,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["jobCandidate"],
        exact: false,
      });
      if (res?.success) {
        toast.success(res.message || "Candidate created successfully.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Failed to create candidate.");
    },
    onSettled: () => {
      dispatch(setAppLoading(false));
    },
  });
};
