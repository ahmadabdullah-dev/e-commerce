using System.ComponentModel.DataAnnotations;

namespace Application.Dtos;

public class ProductOrderItemDto
{
    [Required]
    public required string ProductId { get; set; }

    [Range(1, 1000)]
    public int Quantity { get; set; }
}

public class CreateOrderDto
{
    [Required, StringLength(500)]
    public required string ShippingAddress { get; set; }

    [Required, MinLength(1), MaxLength(200)]
    public required List<ProductOrderItemDto> Products { get; set; }
}