import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import type { AddProductDto, ProductDto } from "../types/product";
import type { PaginatedList, PaginationParams } from "../types/common";

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
export function useGetAllProducts(pagination: PaginationParams) {
  return useQuery({
    queryKey: ["products", pagination],
    queryFn: async () => {
      const response = await agent.get<PaginatedList<ProductDto>>(
        "Product/all",
        { params: pagination },
      );
      return response.data;
    },
    retry: false,
  });
}