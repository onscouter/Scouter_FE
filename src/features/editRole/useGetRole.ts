// hooks/useGetRole.ts
import { useQuery } from "@tanstack/react-query";
import { getRole } from "@/features/editRole/api";

export const useGetRole = (roleId: string) => {
  return useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getRole(roleId),
    enabled: !!roleId,
    staleTime: 1000 * 60 * 5,
  });
};
