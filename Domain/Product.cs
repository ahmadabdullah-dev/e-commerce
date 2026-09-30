using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Product : BaseEntity
{
    public string? ImageUrl { get; set; } 
    public string? ImagePublicId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }
    public bool IsActive { get; set; } = true;
}