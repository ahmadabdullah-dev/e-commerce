using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository 
{
    public ProductRepository(ApplicationDbContext dbContext) : base(dbContext) { }


    public async Task<bool> IsProductExistsByIdAsync(string productId, CancellationToken ct)
    {
        return await DbSet.AnyAsync(p => p.Id == productId, ct);
    } 
}

