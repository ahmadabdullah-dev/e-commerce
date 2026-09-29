import type { UserDto } from "../types/user";
import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
export const useCurrentUser = () =>
  useQuery<UserDto>({
    queryKey: ["currentUser"],
    queryFn: () =>
      agent.get<UserDto>("/User/current").then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });
