import { useMutation } from "@tanstack/react-query";
import { createRole } from "@/features/createRole/api";
import type { RoleCreatePayload } from "@/types/rubric";

export const useCreateRole = () => {
  return useMutation({
    mutationFn: (data: RoleCreatePayload) => createRole(data),
  });
};
