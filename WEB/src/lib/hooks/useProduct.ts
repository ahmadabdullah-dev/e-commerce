import { useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import type { AddProductDto } from "../types/product";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (dto: AddProductDto) => {
      const response = await agent.post("/product/add", dto, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });
};