using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders  { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<BasketItem> BasketItems { get; set; }
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

        builder.Entity<BasketItem>(entity =>
            {
                entity.HasOne(bi => bi.Basket)
                    .WithMany(b => b.Items)
                    .HasForeignKey(bi => bi.BasketId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(bi => bi.Product)
                    .WithMany()
                    .HasForeignKey(bi => bi.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.Property(bi => bi.Quantity)
                    .IsRequired()
                    .HasDefaultValue(1);

                entity.HasIndex(bi => new { bi.BasketId, bi.ProductId })
                    .IsUnique();
            });
    }
}
