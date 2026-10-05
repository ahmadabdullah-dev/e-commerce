namespace Domain;

public class ProductOrderItem : BaseEntity
{
    public required string ProductId { get; set; }
    public Product? Product { get; set; } 
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice  => UnitPrice * Quantity;
}
