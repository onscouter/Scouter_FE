import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { SuccessResponse } from "@/types/api/success";
import { toast } from "react-toastify";
import axios from "axios";

interface useJobMutateOptions<TData> {
  mutationFn: (data: TData) => Promise<SuccessResponse>;
  onSuccessRedirect?: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useJobMutate = <TData>({
  mutationFn,
  onSuccessRedirect,
  successMessage = "Success!",
  errorMessage = "An error occurred.",
}: useJobMutateOptions<TData>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
        exact: false,
      });
      if (res?.success) {
        toast.success(res.message || successMessage);
        if (onSuccessRedirect) navigate(onSuccessRedirect);
      } else {
        toast.error("Unexpected error occurred.");
      }
    },
    onError: (err) => {
      const message =
        axios.isAxiosError(err) && err.response?.data?.detail
          ? err.response.data.detail
          : err instanceof Error
          ? err.message
          : errorMessage;

      toast.error(message);
    },
  });
};
