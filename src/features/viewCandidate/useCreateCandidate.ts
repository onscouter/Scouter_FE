// hooks/useCreateCandidate.ts
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setAppLoading } from "@/store/appSlice";
import { toast } from "react-toastify";
import { createCandidate } from "@/features/viewCandidate/api";

interface UseCreateCandidateProps {
  onSuccess?: () => void;
}

export const useCreateCandidate = ({
  onSuccess,
}: UseCreateCandidateProps = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: createCandidate,
    onSuccess: (res) => {
      dispatch(setAppLoading(false));
      if (res?.success) {
        toast.success(res.message || "Candidate created successfully.");
        onSuccess?.();
      } else {
        toast.error("Unexpected error occurred.");
      }
    },
    onError: (err: unknown) => {
      dispatch(setAppLoading(false));
      toast.error((err as Error).message || "Failed to create candidate.");
    },
  });
};
