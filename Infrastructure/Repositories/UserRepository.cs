using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UserRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<string?> GetUserBasketIdAsync(string userId, CancellationToken ct)
    {
        if (userId == null) return "User ID cannot be null.";

        var basketId = await _dbContext.Users.Where(u => u.Id == userId).Select(u => u.BasketId).FirstAsync(ct);
        return basketId;
    }
}
