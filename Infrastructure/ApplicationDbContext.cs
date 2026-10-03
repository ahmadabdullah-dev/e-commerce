using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders  { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        
        base.OnModelCreating(builder);
      
        builder.Entity<AppUser>(entity =>
        {
            entity.Property(u => u.FirstName).HasMaxLength(30).IsRequired();
            entity.Property(u => u.LastName).HasMaxLength(30).IsRequired();
        });

        builder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Name).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Description).HasMaxLength(2000);

        });
        builder.Entity<Order>(entity =>
        {
            entity.HasOne(o => o.Basket)
                  .WithMany(b => b.Orders)
                  .HasForeignKey(o => o.BasketId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(o => o.OrderedUser)
                  .WithMany()                       
                  .HasForeignKey(o => o.OrderedUserId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
        builder.Entity<Basket>(entity =>
        {
            entity.HasOne(b => b.User)
                  .WithMany()                      
                  .HasForeignKey(b => b.UserId);
        });
    }
}
