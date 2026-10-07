import type { RequestUpdateCurrentEmailDto, UpdateCurrentEmailDto, UserDto } from "../types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
export const useCurrentUser = () =>
  useQuery<UserDto>({
    queryKey: ["currentUser"],
    queryFn: () => agent.get<UserDto>("/User/current").then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });

export const useRequestUpdateCurrentEmail = () => {
  return useMutation({
    mutationFn: async (dto: RequestUpdateCurrentEmailDto) => {
      const response = await agent.post<string>("/User/request-update-current-email", dto);
      return response.data;
    },
  });
};

export const useUpdateCurrentEmail = () => {
  return useMutation({
    mutationFn: async (dto: UpdateCurrentEmailDto) => {
      const response = await agent.patch<string>("/User/update-current-email", dto);
      return response.data;
    },
  });
};

export const useResendCurrentEmailConfirmationCode = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await agent.post<string>("/User/resend-update-current-email-confirmation-code");
      return response.data;
    },
  });
};