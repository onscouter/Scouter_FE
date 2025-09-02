import apiClient from "@/api";

export interface AccessGatePayload {
  access_code: string;
}

export const submitAccessCode = async (payload: AccessGatePayload) => {
  const response = await apiClient.post("/access-gate/verify", payload);
  return response;
};
