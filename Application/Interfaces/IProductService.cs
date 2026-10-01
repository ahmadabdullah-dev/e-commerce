namespace Application.Interfaces;
public interface IProductService
{
    Task<Result<string>> AddProductAsync(AddProductDto dto, CancellationToken ct);
    Task<Result<PagedList<ProductDto>>> GetAllProductsAsync(PaginationParams p, CancellationToken ct);
}
