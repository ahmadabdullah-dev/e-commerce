namespace Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository 
{
    public ProductRepository(ApplicationDbContext dbContext) : base(dbContext) { } 
}
