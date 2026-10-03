namespace Domain;

public class Basket: BaseEntity
{
    public required string UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();

}
