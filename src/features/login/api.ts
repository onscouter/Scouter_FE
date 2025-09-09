import apiClient from "@/api";

export interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post("/auth/login", payload);
  return response;
};
