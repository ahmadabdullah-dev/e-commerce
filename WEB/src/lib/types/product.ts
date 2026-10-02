export type AddProductDto =  {
  image?: File | null;
  name: string;
  description?: string;
  price: number;
}
export type ProductDto = {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  isActive: boolean
}

export type UpdateProductDto = {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  image: File | null;
  isActive: boolean;
};
