namespace Domain;

public class Basket: BaseEntity
{
    public required string UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public decimal TotalPrice { get; set; } = 0;
    public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();
}
 