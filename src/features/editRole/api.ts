import apiClient from "@/api";
import type { RoleCreatePayload } from "@/types/rubric";

export const updateRole = async (
  roleId: string,
  roleData: RoleCreatePayload
) => {
  console.log("Updating role with ID:", roleId);
  console.log("Role data:", roleData);
  const response = await apiClient.put(`/role/${roleId}`, roleData);
  return response.data;
};

export const getRole = async (roleId: string) => {
  const response = await apiClient.get(`/role/${roleId}`);
  return response.data;
};
