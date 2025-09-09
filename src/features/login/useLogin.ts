import { useMutation } from "@tanstack/react-query";
import { login, type LoginPayload } from "@/features/login/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
};
