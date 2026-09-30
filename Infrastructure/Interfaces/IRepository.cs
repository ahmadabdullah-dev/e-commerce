namespace Infrastructure.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(string id, CancellationToken ct);
    Task<PagedList<T>> GetAllAsync(PaginationParams p, CancellationToken ct);
    Task AddAsync(T entity, CancellationToken ct);
    bool Update(T entity);
    bool Remove(T entity);
    Task<int> SaveChangesAsync(CancellationToken ct);
}   