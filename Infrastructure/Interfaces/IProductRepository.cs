namespace Infrastructure.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<bool> IsProductExistsByIdAsync(string productId, CancellationToken ct);
    Task<Dictionary<string, decimal>> GetPricesByIdsAsync(List<string> ids, CancellationToken ct);
}
