namespace Infrastructure.Common;

using Microsoft.EntityFrameworkCore;
public class PagedList<T>
{
    public List<T> Items { get; set; } = []; 
    public int CurrentPage { get; set; } 
    public int TotalPages { get; set; } 
    public int TotalCount { get; set; } 
    public bool HasNextPage => CurrentPage < TotalPages; 
    public bool HasPreviousPage => CurrentPage > 1;

    public static async Task<PagedList<T>> CreateAsync(
        IQueryable<T> query,
        int page,
        int pageSize,
        CancellationToken ct = default
        )
    {
        var totalCount = await query.CountAsync(ct);
        var items =
            await query.Skip((page - 1) * pageSize) 
            .Take(pageSize)
            .ToListAsync(ct);
        return new PagedList<T>
        {
            Items = items,
            CurrentPage = page,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize), 
            TotalCount = totalCount
        };
    }
}