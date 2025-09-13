import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAppLoading } from "@/store/appSlice";
import { toast } from "react-toastify";

interface SuccessResponse {
  success: boolean;
  message?: string;
}

interface useRoleMutateOptions<
  TData = unknown,
  TResponse extends SuccessResponse = SuccessResponse
> {
  mutationFn: (data: TData) => Promise<TResponse>;
  onSuccessRedirect?: string;
  successMessage?: string;
  errorMessage?: string;
}

export const useRoleMutate = <
  TData = unknown,
  TResponse extends SuccessResponse = SuccessResponse
>({
  mutationFn,
  onSuccessRedirect,
  successMessage = "Success!",
  errorMessage = "An error occurred.",
}: useRoleMutateOptions<TData, TResponse>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn,
    onSuccess: (res) => {
      dispatch(setAppLoading(false));
      if (res?.success) {
        toast.success(res.message || successMessage);
        if (onSuccessRedirect) navigate(onSuccessRedirect);
      } else {
        toast.error("Unexpected error occurred.");
      }
    },
    onError: (err: unknown) => {
      dispatch(setAppLoading(false));
      toast.error((err as Error).message || errorMessage);
    },
  });
};
