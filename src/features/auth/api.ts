// example

import apiClient from "@/api";

// Login user
export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

// Signup user
export const signupUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/signup", userData);
  return response.data;
};

// Refresh token
export const refreshToken = async () => {
  const response = await apiClient.post("/auth/refresh");
  return response.data;
};
