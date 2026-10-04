namespace Domain;

public class Basket: BaseEntity
{
    public required string UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
 