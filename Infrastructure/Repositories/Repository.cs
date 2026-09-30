using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext Db;
    protected readonly DbSet<T> DbSet;

    public Repository(ApplicationDbContext db)
    {
        Db = db;
        DbSet = db.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(string id, CancellationToken ct = default) => await DbSet.FindAsync(id, ct);

    public virtual async Task<PagedList<T>> GetAllAsync(PaginationParams p, CancellationToken ct = default)
    {
        var query = DbSet.AsNoTracking();

        return await PagedList<T>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
    public virtual async Task AddAsync(T entity, CancellationToken ct = default) => await DbSet.AddAsync(entity, ct);

    public virtual bool Update(T entity) => DbSet.Update(entity) != null;

    public virtual bool Remove(T entity) => DbSet.Remove(entity) != null;

    public Task<int> SaveChangesAsync(CancellationToken ct = default) => Db.SaveChangesAsync(ct);
}