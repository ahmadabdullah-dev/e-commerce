using Microsoft.AspNetCore.Identity;

namespace Domain.Identity;

public class AppUser : IdentityUser
{
    public string? FirstName { get; set; } 
    public string? LastName { get; set; } 
    public string? PendingEmail { get; set; } 

    public string? BasketId { get; set; }   
    public Basket? Basket { get; set; }

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
