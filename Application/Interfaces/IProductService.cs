namespace Application.Interfaces;
public interface IProductService
{
    Task<Result<string>> AddProductAsync(AddProductDto dto, CancellationToken ct);
}
