using Microsoft.AspNetCore.Http;

namespace Application.Dtos;

public class  AddProductDto
{
    public IFormFile? Image { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
}
public class ProductDto
{
    public string Id { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }

    public bool IsActive { get; set; }
}
