using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository 
{
    public ProductRepository(ApplicationDbContext dbContext) : base(dbContext) { }


    public async Task<bool> IsProductExistsByIdAsync(string productId, CancellationToken ct)
    {
        return await DbSet.AnyAsync(p => p.Id == productId, ct);
    }
    public async Task<Dictionary<string, decimal>> GetPricesByIdsAsync(List<string> ids, CancellationToken ct)
    {
        return await DbSet
            .AsNoTracking()
            .Where(p => ids.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id, p => p.Price, ct);
    }
}

