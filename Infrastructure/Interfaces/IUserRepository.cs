namespace Infrastructure.Interfaces;

public interface IUserRepository
{
    public Task<string?> GetUserBasketIdAsync(string userId, CancellationToken ct);
}
