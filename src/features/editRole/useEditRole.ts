import { updateRole } from "@/features/editRole/api";
import { useRoleMutate } from "@/features/shared/hooks/useRoleMutate";

export const useUpdateRole = (roleId: string) =>
  useRoleMutate({
    mutationFn: (data) => updateRole(roleId, data),
    onSuccessRedirect: "/recruiter-home/jobs",
    successMessage: "Role updated!",
    errorMessage: "Failed to update role.",
  });
