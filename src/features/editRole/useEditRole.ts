import { updateRole } from "@/features/editRole/api";
import { useRoleMutate } from "@/features/shared/hooks/useRoleMutate";
import type { RoleCreatePayload } from "@/types/rubric";

export const useUpdateRole = (roleId: string) =>
  useRoleMutate({
    mutationFn: (data: RoleCreatePayload) => updateRole(roleId, data),
    onSuccessRedirect: "/recruiter-home/jobs",
    successMessage: "Role updated!",
    errorMessage: "Failed to update role.",
  });
