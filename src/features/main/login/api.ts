import apiClient from "@/api";
import type { LoginPayload, LoginResponse } from "@/types/api/login";

export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post<LoginResponse>("/auth/login", payload);
  return response.data;
};
