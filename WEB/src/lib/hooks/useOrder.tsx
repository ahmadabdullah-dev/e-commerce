import { useMutation } from "@tanstack/react-query";
import type { CreateOrderDto } from "../types/order";
import agent from "../api/agent";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (dto: CreateOrderDto) => {
      const response = await agent.post("/Order/create", dto);
      return response.data;
    },
  });
};
