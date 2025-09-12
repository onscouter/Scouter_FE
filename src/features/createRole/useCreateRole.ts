import { useMutation } from "@tanstack/react-query";
import { createRole } from "@/features/createRole/api";
import type { RoleCreatePayload } from "@/types/rubric";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAppLoading } from "@/store/appSlice";
import { toast } from "react-toastify";

export const useCreateRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: RoleCreatePayload) => createRole(data),
    onSuccess: (res) => {
      dispatch(setAppLoading(false));
      if (res?.success) {
        toast.success(res.message || "Role created!");
        navigate("/recruiter-home/jobs");
      } else {
        toast.error("Unexpected error occurred.");
      }
    },
    onError: (err: unknown) => {
      dispatch(setAppLoading(false));
      toast.error((err as Error).message || "Failed to create role.");
    },
  });
};
