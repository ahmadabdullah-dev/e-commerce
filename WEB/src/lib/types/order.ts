export type ProductOrderItemDto = {
    productId: string,
    quantity: number
}
export type CreateOrderDto = {
  shippingAddress: string,
  products: ProductOrderItemDto[]
}