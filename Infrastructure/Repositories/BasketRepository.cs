namespace Infrastructure.Repositories;

public class BasketRepository : Repository<Basket>, IBasketRepository
{
    public BasketRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
        
    }
}
