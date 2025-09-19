import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/main/login/api";
import type { LoginPayload, LoginResponse } from "@/types/api/login";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => login(payload),
  });
};
