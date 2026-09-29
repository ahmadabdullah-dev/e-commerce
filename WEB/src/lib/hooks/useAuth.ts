import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { LoginDto, RegisterDto } from "../types/auth";

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