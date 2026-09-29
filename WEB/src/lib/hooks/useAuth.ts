import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { LoginDto, RegisterDto, ResetPasswordDto } from "../types/auth";

export function useLoginUser() {
  return useMutation({
    mutationFn: async (creds: LoginDto) => {
      const response = await agent.post("/Auth/login", creds);
      return response;
    },
  });
}
export function useRegisterUser() {
  return useMutation({
    mutationFn: async (creds: RegisterDto) => {
      const response = await agent.post("/Auth/register", creds);
      return response;
    },
  });
}
export const useForgetPasswordAsync = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await agent.post("/auth/forget-password", null, {
        params: { email },
      });
      return response.data;
    },
  });
};

export const useResetPasswordAsync = () => {
  return useMutation({
    mutationFn: async (creds: ResetPasswordDto) => {
      const response = await agent.post("/auth/reset-password", creds);
      return response.data;
    },
  });
};