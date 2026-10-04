namespace Domain;

public class BasketItem : BaseEntity
{
    public required string BasketId { get; set; }
    public Basket? Basket { get; set; } 

    public required string ProductId { get; set; }
    public Product? Product { get; set; } 

    public int Quantity { get; set; } = 1;
}