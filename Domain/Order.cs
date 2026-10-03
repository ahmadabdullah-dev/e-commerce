namespace Domain;

public class Order : BaseEntity
{
    public required string OrderedUserId { get; set; }
    public AppUser OrderedUser { get; set; } = null!;
    public required string OrderStatus { get; set; }
    public required string ShippingAddress { get; set; }
    public required string BasketId { get; set; }
    public Basket Basket { get; set; } = null!;

}
