import apiClient from "@/api";
import type { RoleCreatePayload } from "@/types/rubric";

export const createRole = async (roleData: RoleCreatePayload) => {
  const response = await apiClient.post("/role/new-role", roleData);
  return response.data;
};
