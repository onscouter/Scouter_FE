import { createRole } from "@/features/createRole/api";
import { useRoleMutate } from "@/features/shared/hooks/useRoleMutate";

export const useCreateRole = () =>
  useRoleMutate({
    mutationFn: createRole,
    onSuccessRedirect: "/recruiter-home/jobs",
    successMessage: "Role created!",
    errorMessage: "Failed to create role.",
  });
