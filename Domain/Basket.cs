namespace Domain;

public class Basket: BaseEntity
{
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
