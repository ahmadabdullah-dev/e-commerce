using Microsoft.AspNetCore.Http;

namespace Application.Dtos;

public class  AddProductDto
{
    public IFormFile? Image { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
}
